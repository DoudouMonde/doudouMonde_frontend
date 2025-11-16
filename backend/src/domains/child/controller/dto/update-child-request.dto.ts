import { Gender } from '@/entities/gender.enum';
import { IsDateString, IsEnum, IsNotEmpty, IsString, MaxDate, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@/entities';

export class UpdateChildRequest {
  @ApiProperty({
    description: '아이 이름',
    example: '김철수',
    type: String,
  })
  @IsString({ message: `name 은(는) 문자열이어야 합니다.` })
  @IsNotEmpty({ message: `name 은(는) 필수 입력 항목입니다.` })
  @MaxLength(20, { message: `name 은(는) 최대 20자까지 입력 가능합니다.` })
  @Matches(/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]+$/, {
    message: `name 은(는) 한글, 영어(대/소문자), 공백만 입력 가능합니다.`,
  })
  @Matches(/(?=.*[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z])/, {
    message: `name 은(는) 공백만으로 구성될 수 없습니다.`,
  })
  name: string;

  @ApiProperty({
    description: '아이 생년월일',
    example: '2020-01-15',
    type: String,
  })
  @IsNotEmpty({ message: `birthday 은(는) 필수 입력 항목입니다.` })
  @IsDateString({}, { message: `birthday 은(는) 날짜 형식(YYYY-MM-DD)이어야 합니다.` })
  birthday: string;

  @ApiProperty({
    description: '아이 성별',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: '아이 프로필',
    example: Profile.DOG,
    enum: Profile,
  })
  @IsEnum(Profile)
  @IsNotEmpty()
  profile: Profile;
}
