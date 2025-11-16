import { Profile } from '@/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ChildItemResponse {
  @ApiProperty({
    description: '아이 ID',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '아이 이름',
    type: String,
    example: '김철수',
  })
  name: string;

  @ApiProperty({
    description: '아이 프로필',
    enum: Profile,
    example: Profile.DOG,
  })
  profile: Profile;
}

export class ChildListResponse {
  @ApiProperty({
    description: '아이 목록',
    type: [ChildItemResponse],
  })
  items: ChildItemResponse[];
}
