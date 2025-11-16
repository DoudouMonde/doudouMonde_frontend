import { CharacterAccessory, CharacterAnimal, CharacterEmotion } from '@/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateReviewRequest {
  @ApiProperty({
    description: '관람날짜',
    example: '2025-01-01',
    type: String,
  })
  @IsDateString({}, { message: `watchDate 은(는) 날짜 형식(YYYY-MM-DD)이어야 합니다.` })
  @IsNotEmpty({ message: `watchDate 은(는) 필수 입력 항목입니다.` })
  watchDate: string;

  @ApiProperty({
    description: '리뷰 내용 (선택사항)',
    example: '정말 좋은 공연이었어요!',
    type: String,
    required: false,
  })
  @IsString({ message: `content 은(는) 문자열이어야 합니다.` })
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: '캐릭터 동물 타입',
    enum: CharacterAnimal,
    example: CharacterAnimal.DOG,
  })
  @IsEnum(CharacterAnimal, {
    message: `characterAnimal 은(는) ${Object.values(CharacterAnimal).join(', ')} 중 하나여야 합니다.`,
  })
  @IsNotEmpty({ message: `characterAnimal 은(는) 필수 입력 항목입니다.` })
  characterAnimal: CharacterAnimal;

  @ApiProperty({
    description: '캐릭터 감정',
    enum: CharacterEmotion,
    example: CharacterEmotion.HAPPY,
  })
  @IsEnum(CharacterEmotion, {
    message: `characterEmotion 은(는) ${Object.values(CharacterEmotion).join(', ')} 중 하나여야 합니다.`,
  })
  @IsNotEmpty({ message: `characterEmotion 은(는) 필수 입력 항목입니다.` })
  characterEmotion: CharacterEmotion;

  @ApiProperty({
    description: '캐릭터 악세서리',
    enum: CharacterAccessory,
    example: CharacterAccessory.RIBBON,
  })
  @IsEnum(CharacterAccessory, {
    message: `characterAccessory 은(는) ${Object.values(CharacterAccessory).join(', ')} 중 하나여야 합니다.`,
  })
  @IsNotEmpty({ message: `characterAccessory 은(는) 필수 입력 항목입니다.` })
  characterAccessory: CharacterAccessory;
}
