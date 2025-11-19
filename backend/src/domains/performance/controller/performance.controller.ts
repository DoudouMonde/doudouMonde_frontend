import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PerformanceService } from '../performance.service';
import { PerformanceListResponse } from './dto/performance-list-response.dto';
import { DoudouMondeApiResponse } from '@/global';

@ApiTags('performances')
@Controller('/api/v1/performances')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  @ApiOperation({ summary: '전체 공연 조회 (30개씩 페이지네이션)' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: '페이지 번호 (기본값: 1)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '공연 목록 조회 성공',
    type: PerformanceListResponse,
  })
  async findAll(@Query('page') page: string = '1'): Promise<DoudouMondeApiResponse<PerformanceListResponse>> {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const performanceListResponse = await this.performanceService.findAll(pageNumber);
    return DoudouMondeApiResponse.success(HttpStatus.OK, performanceListResponse);
  }
}
