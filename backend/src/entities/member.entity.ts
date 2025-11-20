import { Column, Entity } from 'typeorm';
import { SocialType } from './social-type.enum';
import { BaseModel } from '@/entities/base-model.entity';

@Entity()
export class Member extends BaseModel {
  @Column({
    type: 'varchar',
    enum: SocialType,
    nullable: false,
  })
  socialType: SocialType;

  @Column({ type: 'varchar', length: 255 })
  providerId: string;
}
