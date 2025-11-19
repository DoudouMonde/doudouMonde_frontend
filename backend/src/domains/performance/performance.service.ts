import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Performance } from '@/entities/performance.entity';
import { PerformanceListResponse, PerformanceItemResponse } from './controller/dto/performance-list-response.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
  ) {}

  async findAll(page: number = 1): Promise<PerformanceListResponse> {
    const pageSize = 30;
    const skip = (page - 1) * pageSize;

    const [performances, total] = await this.performanceRepository.findAndCount({
      select: ['id', 'name', 'sido', 'posterUrl'],
      skip,
      take: pageSize,
    });

    const items: PerformanceItemResponse[] = performances.map((performance) => ({
      id: performance.id,
      name: performance.name,
      sido: performance.sido,
      posterUrl: performance.posterUrl,
    }));

    const totalPages = Math.ceil(total / pageSize);

    return {
      items,
      page,
      pageSize,
      total,
      totalPages,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} performance`;
  }
}
