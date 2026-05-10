import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChildDto } from './users.dto';
import type { User } from '@kidsmath/shared';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        children: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
            birthDate: true,
            createdAt: true,
            updatedAt: true,
            openId: true,
            unionId: true,
            phone: true,
            role: true,
            parentId: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return this.mapUser(user);
  }

  async createChild(parentId: string, dto: CreateChildDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        nickname: dto.nickname,
        avatar: dto.avatar,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
        role: 'CHILD',
        parentId,
      },
    });
    return this.mapUser(user);
  }

  async findChildren(parentId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { parentId, role: 'CHILD' },
      orderBy: { createdAt: 'asc' },
    });
    return users.map((u) => this.mapUser(u));
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
      children: prismaUser.children?.map((c: any) => this.mapUser(c)),
      createdAt: prismaUser.createdAt.toISOString(),
      updatedAt: prismaUser.updatedAt.toISOString(),
    };
  }
}
