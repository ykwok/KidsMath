import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChildDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
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
          },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createChild(parentId: string, dto: CreateChildDto) {
    return this.prisma.user.create({
      data: {
        nickname: dto.nickname,
        avatar: dto.avatar,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
        role: 'CHILD',
        parentId,
      },
      select: {
        id: true,
        nickname: true,
        avatar: true,
        birthDate: true,
        createdAt: true,
      },
    });
  }

  async findChildren(parentId: string) {
    return this.prisma.user.findMany({
      where: { parentId, role: 'CHILD' },
      select: {
        id: true,
        nickname: true,
        avatar: true,
        birthDate: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
