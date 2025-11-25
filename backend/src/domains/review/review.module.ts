import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './controller/review.controller';
import { Review, Member, Performance, Character, ReviewImage, Child } from '@/entities';
import { ChildReview } from '@/entities/child-review.entity';
import { S3StorageService } from '@/supports/s3-storage.service';
import { S3Config } from '@/shared/config/s3.config';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Member, Performance, Character, ReviewImage, Child, ChildReview])],
  controllers: [ReviewController],
  providers: [ReviewService, S3Config, S3StorageService],
})
export class ReviewModule {}
