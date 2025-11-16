import { BaseModel } from '@/entities/base-model.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Child } from '@/entities';
import { Review } from '@/entities/review.entity';

@Entity()
export class ChildReview extends BaseModel {
  @ManyToOne(() => Child, (child) => child.id)
  child: Child;

  @ManyToOne(() => Review, (review) => review.id)
  review: Review;
}
