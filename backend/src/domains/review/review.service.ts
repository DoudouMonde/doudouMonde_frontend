import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessException, ErrorCode } from '@/global';
import { Review, Member, Performance, Character, ReviewImage } from '@/entities';
import { CreateReviewRequest } from './controller/dto/create-review-request.dto';
import { UpdateReviewRequest } from './controller/dto/update-review-request.dto';
import { ReviewListResponse } from './controller/dto/review-list-response.dto';
import { ReviewDetailResponse } from './controller/dto/review-detail-response.dto';
import { S3Service } from '@/common/services/s3.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(ReviewImage)
    private readonly reviewImageRepository: Repository<ReviewImage>,
    private readonly s3Service: S3Service,
  ) {}

  async createReview(
    createReviewRequest: CreateReviewRequest,
    memberId: number,
    audio?: Express.Multer.File,
    images?: Express.Multer.File[],
  ): Promise<Review> {
    // Member 조회 및 검증
    const member: Member | null = await this.memberRepository.findOne({ where: { id: memberId } });
    if (!member) {
      throw new BusinessException(ErrorCode.MEMBER_NOT_FOUND);
    }

    // Performance 조회 및 검증
    const performance: Performance | null = await this.performanceRepository.findOne({
      where: { id: createReviewRequest.performanceId },
    });
    if (!performance) {
      throw new BusinessException(ErrorCode.PERFORMANCE_NOT_FOUND);
    }

    // 동일 공연 리뷰 중복 검사
    await this.validateDuplicateReview(memberId, createReviewRequest.performanceId);

    // Character 생성
    const character = this.characterRepository.create({
      animal: createReviewRequest.characterAnimal,
      emotion: createReviewRequest.characterEmotion,
      accessory: createReviewRequest.characterAccessory,
    });
    await this.characterRepository.save(character);

    // 오디오 파일 S3 업로드
    let audioUrl = '';
    if (audio) {
      audioUrl = await this.s3Service.uploadFile(audio, 'reviews/audio');
    }

    // Review 생성
    const review = this.reviewRepository.create({
      watchDate: new Date(createReviewRequest.watchDate),
      content: createReviewRequest.content ?? '',
      audioUrl,
      member,
      performance,
      character,
    });

    const savedReview: Review = await this.reviewRepository.save(review);

    // 이미지 파일 S3 업로드 및 저장
    if (images && images.length > 0) {
      const imageUrls = await this.s3Service.uploadFiles(images, 'reviews/images');
      const reviewImages: ReviewImage[] = imageUrls.map((imageUrl: string, index: number) =>
        this.reviewImageRepository.create({
          objectKey: imageUrl,
          order: index + 1,
          review: savedReview,
        }),
      );
      await this.reviewImageRepository.save(reviewImages);
    }

    return savedReview;
  }

  async getReviewList(memberId: number): Promise<ReviewListResponse> {
    const reviews = await this.reviewRepository.find({
      where: { member: { id: memberId } },
      relations: ['performance', 'character'],
      order: { watchDate: 'DESC' },
    });

    return {
      items: reviews.map((review) => ({
        id: review.id,
        watchDate: review.watchDate,
        tree: 'tree-string', // TODO: Tree 로직 구현
        performance: {
          name: review.performance.name,
          posterUrl: review.performance.posterUrl,
        },
        character: {
          animal: review.character.animal,
          emotion: review.character.emotion,
          accessory: review.character.accessory,
        },
      })),
    };
  }

  async getReviewDetail(id: number): Promise<ReviewDetailResponse> {
    const review: Review | null = await this.reviewRepository.findOne({
      where: { id },
      relations: ['character', 'performance'],
    });

    if (!review) {
      throw new BusinessException(ErrorCode.REVIEW_NOT_FOUND);
    }

    // 이미지 조회
    const reviewImages: ReviewImage[] = await this.reviewImageRepository.find({
      where: { review: { id } },
      order: { order: 'ASC' },
    });

    // TODO: S3에서 presigned URL 생성
    const imageUrls = reviewImages.map((img) => `https://s3.example.com/${img.objectKey}`);

    return {
      id: review.id,
      watchDate: review.watchDate,
      content: review.content,
      audioUrl: review.audioUrl,
      characterAnimal: review.character.animal,
      characterEmotion: review.character.emotion,
      characterAccessory: review.character.accessory,
      images: imageUrls,
    };
  }

  async updateReview(
    reviewId: number,
    updateReviewRequest: UpdateReviewRequest,
    memberId: number,
    audio?: Express.Multer.File,
    images?: Express.Multer.File[],
  ): Promise<Review> {
    const review: Review | null = await this.reviewRepository.findOne({
      where: { id: reviewId, member: { id: memberId } },
      relations: ['character'],
    });

    if (!review) {
      throw new BusinessException(ErrorCode.REVIEW_NOT_FOUND);
    }

    // 오디오 파일 업데이트 (새 파일이 있으면 기존 파일 삭제 후 업로드)
    if (audio) {
      // 기존 오디오 파일 삭제
      if (review.audioUrl) {
        await this.s3Service.deleteFile(review.audioUrl);
      }
      // 새 오디오 파일 업로드
      review.audioUrl = await this.s3Service.uploadFile(audio, 'reviews/audio');
    }

    // Review 업데이트
    review.watchDate = new Date(updateReviewRequest.watchDate);
    const content: string = updateReviewRequest.content ?? '';
    review.content = content;

    // Character 업데이트
    review.character.animal = updateReviewRequest.characterAnimal;
    review.character.emotion = updateReviewRequest.characterEmotion;
    review.character.accessory = updateReviewRequest.characterAccessory;

    await this.characterRepository.save(review.character);
    const savedReview: Review = await this.reviewRepository.save(review);

    // 이미지 업데이트 (새 이미지가 있으면 기존 이미지 삭제 후 새로 저장)
    if (images && images.length > 0) {
      // 기존 이미지 조회 및 S3에서 삭제
      const existingImages: ReviewImage[] = await this.reviewImageRepository.find({
        where: { review: { id: reviewId } },
      });
      if (existingImages.length > 0) {
        const existingImageUrls = existingImages.map((img) => img.objectKey);
        await this.s3Service.deleteFiles(existingImageUrls);
      }

      // 기존 이미지 DB에서 삭제
      await this.reviewImageRepository.delete({ review: { id: reviewId } });

      // 새 이미지 S3 업로드 및 저장
      const imageUrls = await this.s3Service.uploadFiles(images, 'reviews/images');
      const reviewImages: ReviewImage[] = imageUrls.map((imageUrl: string, index: number) =>
        this.reviewImageRepository.create({
          objectKey: imageUrl,
          order: index + 1,
          review: savedReview,
        }),
      );
      await this.reviewImageRepository.save(reviewImages);
    }

    return savedReview;
  }

  async deleteReview(reviewId: number, memberId: number): Promise<void> {
    const review: Review | null = await this.reviewRepository.findOne({
      where: { id: reviewId, member: { id: memberId } },
      relations: ['character', 'member'],
    });

    if (!review) {
      throw new BusinessException(ErrorCode.REVIEW_NOT_FOUND);
    }

    // S3에서 오디오 파일 삭제
    if (review.audioUrl) {
      await this.s3Service.deleteFile(review.audioUrl);
    }

    // S3에서 이미지 파일 삭제
    const reviewImages: ReviewImage[] = await this.reviewImageRepository.find({
      where: { review: { id: reviewId } },
    });
    if (reviewImages.length > 0) {
      const imageUrls = reviewImages.map((img) => img.objectKey);
      await this.s3Service.deleteFiles(imageUrls);
    }

    // 관련 이미지 DB에서 삭제
    await this.reviewImageRepository.delete({ review: { id: reviewId } });

    // Character 삭제
    await this.characterRepository.delete(review.character.id);

    // Review 삭제
    await this.reviewRepository.delete(reviewId);
  }

  private async validateDuplicateReview(memberId: number, performanceId: number): Promise<void> {
    const existingReview: Review | null = await this.reviewRepository.findOne({
      where: {
        member: { id: memberId },
        performance: { id: performanceId },
      },
    });

    if (existingReview) {
      throw new BusinessException(ErrorCode.REVIEW_DUPLICATE_PERFORMANCE);
    }
  }
}
