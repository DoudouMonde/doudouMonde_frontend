import { Profile } from '@/entities/profile.enum';
import { Member } from '@/entities/member.entity';
import { BaseModel } from '@/entities/base-model.entity';
import { Gender } from '@/entities/gender.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MaxDate } from 'class-validator';

@Entity()
export class Child extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  @MaxDate(new Date(), { message: `birthday 은(는) 오늘 날짜를 포함한 과거 날짜여야 합니다.` })
  birthday: Date;

  @Column({ enum: Gender })
  gender: Gender;

  @Column({ enum: Profile })
  profile: Profile;

  @ManyToOne(() => Member, (member) => member.id)
  member: Member;
}
