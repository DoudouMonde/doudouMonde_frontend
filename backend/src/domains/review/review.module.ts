import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewController } from './controller/review.controller';
import { Review, Member, Performance, Character, ReviewImage, Child } from '@/entities';
import { ChildReview } from '@/entities/child-review.entity';
import { S3Service } from '@/common/services/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Member, Performance, Character, ReviewImage, Child, ChildReview])],
  controllers: [ReviewController],
  providers: [ReviewService, S3Service],
})
export class ReviewModule {}
