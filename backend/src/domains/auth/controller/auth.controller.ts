import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DoudouMondeApiResponse } from '@/global';

import { AuthService } from '@/domains/auth/auth.service';
import { Member } from '@/entities';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createMemberRequest: Member) {
    const member = await this.authService.create(createMemberRequest);
    return DoudouMondeApiResponse.success(HttpStatus.CREATED);
  }
}
