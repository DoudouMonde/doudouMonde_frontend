import { CharacterAccessory, CharacterAnimal, CharacterEmotion } from '@/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsNotEmpty, IsEnum, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PerformanceInfo {
  @ApiProperty({
    description: '공연 이름',
    example: '공연 제목',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '공연 포스터 URL',
    example: 'https://example.com/poster.jpg',
  })
  @IsString()
  @IsNotEmpty()
  posterUrl: string;
}

export class CharacterInfo {
  @ApiProperty({
    description: '캐릭터 동물 타입',
    enum: CharacterAnimal,
    example: CharacterAnimal.DOG,
  })
  @IsEnum(CharacterAnimal)
  @IsNotEmpty()
  animal: CharacterAnimal;

  @ApiProperty({
    description: '캐릭터 감정',
    enum: CharacterEmotion,
    example: CharacterEmotion.HAPPY,
  })
  @IsEnum(CharacterEmotion)
  @IsNotEmpty()
  emotion: CharacterEmotion;

  @ApiProperty({
    description: '캐릭터 악세서리',
    enum: CharacterAccessory,
    example: CharacterAccessory.RIBBON,
  })
  @IsEnum(CharacterAccessory)
  @IsNotEmpty()
  accessory: CharacterAccessory;
}

export class ReviewItemResponse {
  @ApiProperty({
    description: '리뷰 ID',
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: '관람 날짜',
    example: '2025-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  watchDate: Date;

  @ApiProperty({
    description: '트리 정보',
    example: 'tree-string',
  })
  @IsString()
  @IsNotEmpty()
  tree: string;

  @ApiProperty({
    description: '공연 정보',
    type: PerformanceInfo,
  })
  @ValidateNested()
  @Type(() => PerformanceInfo)
  @IsNotEmpty()
  performance: PerformanceInfo;

  @ApiProperty({
    description: '캐릭터 정보',
    type: CharacterInfo,
  })
  @ValidateNested()
  @Type(() => CharacterInfo)
  @IsNotEmpty()
  character: CharacterInfo;
}

export class ReviewListResponse {
  @ApiProperty({
    description: '리뷰 목록',
    type: [ReviewItemResponse],
  })
  items: ReviewItemResponse[];
}
