import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateChildDto } from './users.dto';

@Controller('api/v1/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser('sub') userId: string) {
    return this.usersService.findById(userId);
  }

  @Post('me/children')
  async createChild(
    @CurrentUser('sub') userId: string,
    @Body() dto: CreateChildDto,
  ) {
    return this.usersService.createChild(userId, dto);
  }

  @Get('me/children')
  async getChildren(@CurrentUser('sub') userId: string) {
    return this.usersService.findChildren(userId);
  }
}
