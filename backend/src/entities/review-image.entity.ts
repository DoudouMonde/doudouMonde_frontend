import { Review } from './review.entity';
import { BaseModel } from './base-model.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ReviewImage extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  objectKey: string;

  @ManyToOne(() => Review, (review) => review.id)
  review: Review;

  @Column({ type: 'integer' })
  order: number;
}
