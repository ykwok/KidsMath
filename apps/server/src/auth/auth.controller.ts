import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WechatLoginDto, GuestLoginDto } from './auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('wechat')
  async wechatLogin(@Body() dto: WechatLoginDto) {
    return this.authService.wechatLogin(dto);
  }

  @Post('guest')
  async guestLogin(@Body() dto: GuestLoginDto) {
    return this.authService.guestLogin(dto);
  }
}
