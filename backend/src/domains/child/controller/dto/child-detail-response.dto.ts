import { Gender, Profile } from '@/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ChildDetailResponse {
  @ApiProperty({
    description: '아이 ID',
    example: 1,
    type: Number,
  })
  id: number;
  @ApiProperty({
    description: '아이 이름',
    example: '김철수',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: '아이 생년월일',
    example: '2020-01-15',
    type: Date,
  })
  birthday: Date;

  @ApiProperty({
    description: '아이 성별',
    enum: Gender,
    example: Gender.MALE,
  })
  gender: Gender;

  @ApiProperty({
    description: '아이 프로필',
    example: Profile.DOG,
    enum: Profile,
  })
  profile: Profile;
}
