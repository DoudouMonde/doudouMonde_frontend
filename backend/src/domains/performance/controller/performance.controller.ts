import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PerformanceService } from '../performance.service';

@ApiTags('performances')
@Controller('/api/v1/performances')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}
}
