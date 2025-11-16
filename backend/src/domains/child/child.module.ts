import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildService } from './child.service';
import { ChildController } from './controller/child.controller';
import { Child, Member } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Child, Member])],
  controllers: [ChildController],
  providers: [ChildService],
})
export class ChildModule {}
