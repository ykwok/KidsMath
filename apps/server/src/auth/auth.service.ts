import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { WechatLoginDto, GuestLoginDto } from './auth.dto';
import type { AuthResponse, User } from '@kidsmath/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async wechatLogin(dto: WechatLoginDto): Promise<AuthResponse> {
    // MVP: mock WeChat login using code as openId
    const openId = `wx_mock_${dto.code}`;

    let user = await this.prisma.user.findUnique({
      where: { openId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          openId,
          nickname: dto.nickname || `微信用户_${dto.code.slice(0, 6)}`,
          avatar: dto.avatar,
          role: 'PARENT',
        },
      });
    }

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      token,
      user: this.mapUser(user),
    };
  }

  async guestLogin(dto: GuestLoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.create({
      data: {
        nickname: dto.nickname || `游客_${Date.now().toString(36)}`,
        role: 'PARENT',
      },
    });

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      token,
      user: this.mapUser(user),
    };
  }

  private mapUser(prismaUser: any): User {
    return {
      id: prismaUser.id,
      openId: prismaUser.openId ?? undefined,
      unionId: prismaUser.unionId ?? undefined,
      phone: prismaUser.phone ?? undefined,
      nickname: prismaUser.nickname ?? undefined,
      avatar: prismaUser.avatar ?? undefined,
      role: prismaUser.role,
      parentId: prismaUser.parentId ?? undefined,
      birthDate: prismaUser.birthDate
        ? prismaUser.birthDate.toISOString()
        : undefined,
      createdAt: prismaUser.createdAt.toISOString(),
      updatedAt: prismaUser.updatedAt.toISOString(),
    };
  }
}
