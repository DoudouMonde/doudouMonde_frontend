import { Genre } from '@/entities/genre';
import { BaseModel } from '@/entities/base-model.entity';
import { Column, Entity } from 'typeorm';
import { Sido } from '@/entities/sido.enum';

@Entity()
export class Performance extends BaseModel {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'integer' })
  durationMinute: number;

  @Column({ type: 'integer' })
  audienceCount: number;

  @Column({ type: 'varchar', length: 255 })
  ageLimit: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ enum: Genre })
  genre: Genre;

  @Column({ type: 'varchar', length: 255 })
  posterUrl: string;

  @Column({ type: 'varchar', length: 255 })
  pfCode: string;

  @Column({ type: 'varchar', length: 255 })
  reservationSiteUrl: string;

  @Column({ type: 'varchar', length: 255 })
  reward: string;

  @Column({ type: 'varchar', length: 255 })
  sido: Sido;
}
