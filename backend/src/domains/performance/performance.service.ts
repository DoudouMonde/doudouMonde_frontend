import { Injectable } from '@nestjs/common';

@Injectable()
export class PerformanceService {
  findAll() {
    return `This action returns all performance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} performance`;
  }
}
