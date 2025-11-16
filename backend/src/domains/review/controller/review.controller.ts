import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  Res,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { ReviewService } from '../review.service';
import { CreateReviewRequest } from './dto/create-review-request.dto';
import { DoudouMondeApiResponse, BusinessException, ErrorCode } from '@/global';
import { UpdateReviewRequest } from './dto/update-review-request.dto';
import { ReviewListResponse } from './dto/review-list-response.dto';
import { ReviewDetailResponse } from './dto/review-detail-response.dto';

@ApiTags('reviews')
@Controller('/api/v1/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({
    summary: '리뷰 목록 조회',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '리뷰 정보 목록 조회 성공',
    type: ReviewListResponse,
  })
  @Get()
  async getReviewList(): Promise<DoudouMondeApiResponse<ReviewListResponse>> {
    const memberId = 1; // TODO: 인증된 사용자 ID로 대체
    const reviewListResponse = await this.reviewService.getReviewList(memberId);
    return DoudouMondeApiResponse.success(HttpStatus.OK, reviewListResponse);
  }

  @ApiOperation({
    summary: '리뷰 상세 조회',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '리뷰 정보 상세 조회 성공',
    type: ReviewDetailResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '리뷰를 찾을 수 없습니다.(RE001)',
  })
  @Get(':reviewId')
  async getReviewDetail(@Param('reviewId') id: string): Promise<DoudouMondeApiResponse<ReviewDetailResponse>> {
    const reviewDetailResponse = await this.reviewService.getReviewDetail(+id);
    return DoudouMondeApiResponse.success(HttpStatus.OK, reviewDetailResponse);
  }

  @Post()
  @ApiOperation({
    summary: '리뷰 생성',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  )
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '리뷰 생성 성공',
    headers: {
      Location: {
        description: '리뷰 생성 후 리뷰 ID를 반환',
        schema: {
          type: 'string',
          example: 'reviews/100',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: '이미 리뷰를 작성한 공연입니다 (RE002)',
  })
  async createReview(
    @Body() createReviewRequest: CreateReviewRequest,
    @UploadedFiles()
    files: {
      audio?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    const memberId = 1; // TODO: 인증된 사용자 ID로 대체

    // 관람날짜가 오늘 이후이면 BadRequestException 발생
    if (new Date(createReviewRequest.watchDate) > new Date()) {
      throw new BusinessException(ErrorCode.ERROR_DATE_BEFORE_TODAY);
    }

    const review = await this.reviewService.createReview(
      createReviewRequest,
      memberId,
      files?.audio?.[0],
      files?.images,
    );

    res.setHeader('Location', `/reviews/${review.id}`);
    return DoudouMondeApiResponse.success(HttpStatus.CREATED);
  }

  @Put(':reviewId')
  @ApiOperation({
    summary: '리뷰 정보 수정',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'images', maxCount: 10 },
    ]),
  )
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '리뷰 정보가 성공적으로 수정되었습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '리뷰를 찾을 수 없습니다.(RE001)',
  })
  async updateReview(
    @Param('reviewId') reviewId: number,
    @Body() updateReviewRequest: UpdateReviewRequest,
    @UploadedFiles()
    files: {
      audio?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
  ): Promise<DoudouMondeApiResponse<void>> {
    const memberId = 1; // TODO: 인증된 사용자 ID로 대체

    // 관람날짜가 오늘 이후이면 BadRequestException 발생
    if (new Date(updateReviewRequest.watchDate) > new Date()) {
      throw new BusinessException(ErrorCode.ERROR_DATE_BEFORE_TODAY);
    }

    await this.reviewService.updateReview(reviewId, updateReviewRequest, memberId, files?.audio?.[0], files?.images);
    return DoudouMondeApiResponse.success(HttpStatus.NO_CONTENT);
  }

  @ApiOperation({
    summary: '리뷰 삭제',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '리뷰 정보가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '리뷰를 찾을 수 없습니다.(RE001)',
  })
  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: number): Promise<DoudouMondeApiResponse<void>> {
    const memberId = 1; // TODO: 인증된 사용자 ID로 대체
    await this.reviewService.deleteReview(reviewId, memberId);
    return DoudouMondeApiResponse.success(HttpStatus.NO_CONTENT);
  }
}
