import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChildRequest } from '@/domains/child/controller/dto/create-child-request.dto';
import { UpdateChildRequest } from '@/domains/child/controller/dto/update-child-request.dto';
import { Child, Member } from '@/entities';
import { Repository } from 'typeorm';
import { BusinessException, ErrorCode } from '@/global';
import { ChildListResponse } from '@/domains/child/controller/dto/child-list-response.dto';
import { ChildDetailResponse } from '@/domains/child/controller/dto/child-detail-response.dto';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}
  async createChild(createChildRequest: CreateChildRequest, memberId: number) {
    const child = this.childRepository.create(createChildRequest);

    await this.validateDuplicateChildName(createChildRequest.name); //이름 중복 검사

    const member = await this.memberRepository.findOne({ where: { id: memberId } });

    if (!member) {
      throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
    }

    child.member = member;
    return await this.childRepository.save(child);
  }

  async getChildList(memberId: number): Promise<ChildListResponse> {
    const children = await this.childRepository.find({ where: { member: { id: memberId } } });
    return {
      items: children.map((child) => ({
        id: child.id,
        name: child.name,
        profile: child.profile,
      })),
    };
  }

  async getChildDetail(id: number): Promise<ChildDetailResponse> {
    const child = await this.childRepository.findOne({ where: { id } });
    if (!child) {
      throw new BusinessException(ErrorCode.CHILD_NOT_FOUND);
    }
    return {
      id: child.id,
      name: child.name,
      birthday: child.birthday,
      gender: child.gender,
      profile: child.profile,
    };
  }

  async updateChild(childId: number, updateChildRequest: UpdateChildRequest, memberId: number) {
    const child = await this.childRepository.findOne({ where: { id: childId, member: { id: memberId } } });
    if (!child) {
      throw new BusinessException(ErrorCode.CHILD_NOT_FOUND);
    }
    await this.validateDuplicateChildName(updateChildRequest.name);
    Object.assign(child, updateChildRequest);
    return await this.childRepository.save(child);
  }

  async deleteChild(childId: number, memberId: number) {
    const child = await this.childRepository.findOne({
      where: { id: childId, member: { id: memberId } },
      relations: ['member'],
    });
    if (!child) {
      throw new BusinessException(ErrorCode.CHILD_NOT_FOUND);
    }
    console.log('Child:', child);
    console.log('Member:', child.member);

    return await this.childRepository.delete(childId);
  }

  private async validateDuplicateChildName(name: string) {
    const child = await this.childRepository.findOne({ where: { name } });
    if (child) {
      throw new BusinessException(ErrorCode.CHILD_NAME_DUPLICATE);
    }
  }
}
