import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '@/entities';
import { AuthController } from '@/domains/auth/controller/auth.controller';
import { AuthService } from '@/domains/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
