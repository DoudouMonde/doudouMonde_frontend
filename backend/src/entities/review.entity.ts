import { Character } from './character.entity';
import { Member } from './member.entity';
import { Performance } from './performance.entity';
import { BaseModel } from './base-model.entity';
import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Review extends BaseModel {
  @ManyToOne(() => Performance)
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  //관람날짜
  @Column({ type: 'date' })
  watchDate: Date;

  //후기내용
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @OneToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;
}
