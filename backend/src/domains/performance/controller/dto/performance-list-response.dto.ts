import { ApiProperty } from '@nestjs/swagger';

export class PerformanceItemResponse {
  @ApiProperty({
    description: '공연 ID',
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '공연명',
    type: String,
    example: '뮤지컬 레미제라블',
  })
  name: string;

  @ApiProperty({
    description: '지역 (시도)',
    type: String,
    example: '서울특별시',
  })
  sido: string;

  @ApiProperty({
    description: '포스터 URL',
    type: String,
    example: 'https://example.com/poster/les-miserables.jpg',
  })
  posterUrl: string;
}

export class PerformanceListResponse {
  @ApiProperty({
    description: '공연 목록',
    type: [PerformanceItemResponse],
  })
  items: PerformanceItemResponse[];

  @ApiProperty({
    description: '현재 페이지',
    type: Number,
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: '페이지당 항목 수',
    type: Number,
    example: 30,
  })
  pageSize: number;

  @ApiProperty({
    description: '총 항목 수',
    type: Number,
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: '총 페이지 수',
    type: Number,
    example: 4,
  })
  totalPages: number;
}
