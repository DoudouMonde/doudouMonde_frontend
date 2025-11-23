import { CharacterAccessory, CharacterAnimal, CharacterEmotion } from '@/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewDetailResponse {
  @ApiProperty({
    description: '리뷰 ID',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: '관람날짜',
    example: '2025-01-01',
    type: Date,
  })
  watchDate: Date;

  @ApiProperty({
    description: '리뷰 내용',
    example: '정말 좋은 공연이었어요!',
    type: String,
    required: false,
  })
  content: string | null;

  @ApiProperty({
    description: '캐릭터 동물 타입',
    enum: CharacterAnimal,
    example: CharacterAnimal.DOG,
  })
  characterAnimal: CharacterAnimal;

  @ApiProperty({
    description: '캐릭터 감정',
    enum: CharacterEmotion,
    example: CharacterEmotion.HAPPY,
  })
  characterEmotion: CharacterEmotion;

  @ApiProperty({
    description: '캐릭터 악세서리',
    enum: CharacterAccessory,
    example: CharacterAccessory.RIBBON,
  })
  characterAccessory: CharacterAccessory;

  @ApiProperty({
    description: '리뷰 이미지 URL 목록',
    example: ['https://s3.amazonaws.com/bucket/image1.jpg', 'https://s3.amazonaws.com/bucket/image2.jpg'],
    type: [String],
  })
  images: string[];
}
