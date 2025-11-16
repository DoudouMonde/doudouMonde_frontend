import { Role } from '@/entities/role.enum';
import { BaseModel } from '@/entities/base-model.entity';
import { Member } from '@/entities/member.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class MemberRole extends BaseModel {
  @ManyToOne(() => Member, (member) => member.id)
  member: Member;

  @Column({
    enum: Role,
  })
  role: Role;
}
