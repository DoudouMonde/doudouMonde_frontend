import { CharacterAccessory } from '@/entities/character-accessory.enum';
import { CharacterAnimal } from '@/entities/character-animal.enum';
import { CharacterEmotion } from '@/entities/character-emotion.enum';
import { BaseModel } from '@/entities/base-model.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Character extends BaseModel {
  @Column({ enum: CharacterAccessory })
  accessory: CharacterAccessory;

  @Column({ enum: CharacterAnimal })
  animal: CharacterAnimal;

  @Column({ enum: CharacterEmotion })
  emotion: CharacterEmotion;
}
