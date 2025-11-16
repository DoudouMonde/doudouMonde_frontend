import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChildService } from '../child.service';
import { BusinessException, DoudouMondeApiResponse, ErrorCode } from '@/global';
import { CreateChildRequest } from '@/domains/child/controller/dto/create-child-request.dto';
import { UpdateChildRequest } from '@/domains/child/controller/dto/update-child-request.dto';
import { ChildListResponse } from '@/domains/child/controller/dto/child-list-response.dto';
import { ChildDetailResponse } from '@/domains/child/controller/dto/child-detail-response.dto';

@ApiTags('children')
@Controller('/api/v1/children')
export class ChildController {
  constructor(private readonly childService: ChildService) {}

  @ApiOperation({
    summary: '아이 목록 조회',
  })
  @ApiResponse({ status: HttpStatus.OK, description: '아이 정보 목록 조회 성공', type: ChildListResponse })
  @Get()
  async getChildList(): Promise<DoudouMondeApiResponse<ChildListResponse>> {
    const memberId = 1;
    const childListResponse = await this.childService.getChildList(memberId);
    return DoudouMondeApiResponse.success(HttpStatus.OK, childListResponse);
  }

  @ApiOperation({
    summary: '아이 상세 조회',
  })
  @ApiResponse({ status: HttpStatus.OK, description: '아이 정보 상세 조회 성공', type: ChildDetailResponse })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '아이를 찾을 수 없습니다.(CH001)',
  })
  @Get(':childId')
  async getChildDetail(@Param('childId') id: string): Promise<DoudouMondeApiResponse<ChildDetailResponse>> {
    const childDetailResponse = await this.childService.getChildDetail(+id);
    return DoudouMondeApiResponse.success(HttpStatus.OK, childDetailResponse);
  }

  @Post()
  @ApiOperation({
    summary: '아이 생성',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '아이 생성 성공',
    headers: {
      Location: {
        description: '아이 생성 후 아이 ID를 반환',
        schema: {
          type: 'string',
          example: 'children/100',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: '아이 이름에 중복이 있습니다 (CH011)',
  })
  async createChild(@Body() createChildRequest: CreateChildRequest, @Res({ passthrough: true }) res: Response) {
    const memberId = 1;

    //createChildRequest의 날짜가 오늘 이후이면 BadRequestException 발생
    if (new Date(createChildRequest.birthday) > new Date()) {
      throw new BusinessException(ErrorCode.ERROR_DATE_BEFORE_TODAY);
    }

    const child = await this.childService.createChild(createChildRequest, memberId);

    res.setHeader('Location', `/children/${child.id}`);
    return DoudouMondeApiResponse.success(HttpStatus.CREATED);
  }

  @Put(':childId')
  @ApiOperation({
    summary: '아이 정보 수정',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '아이 정보가 성공적으로 수정되었습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '아이를 찾을 수 없습니다.(CH001)',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: '아이 이름에 중복이 있습니다 (CH011)',
  })
  async updateChild(
    @Param('childId') childId: number,
    @Body() updateChildRequest: UpdateChildRequest,
  ): Promise<DoudouMondeApiResponse<void>> {
    const memberId = 1;

    //createChildRequest의 날짜가 오늘 이후이면 BadRequestException 발생
    if (new Date(updateChildRequest.birthday) > new Date()) {
      throw new BusinessException(ErrorCode.ERROR_DATE_BEFORE_TODAY);
    }

    await this.childService.updateChild(childId, updateChildRequest, memberId);
    return DoudouMondeApiResponse.success(HttpStatus.NO_CONTENT);
  }

  @ApiOperation({
    summary: '아이 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '아이 정보가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '아이를 찾을 수 없습니다.(CH001)',
  })
  @Delete(':childId')
  async deleteChild(@Param('childId') childId: number): Promise<DoudouMondeApiResponse<void>> {
    const memberId = 1;
    await this.childService.deleteChild(childId, memberId);
    return DoudouMondeApiResponse.success(HttpStatus.NO_CONTENT);
  }
}
