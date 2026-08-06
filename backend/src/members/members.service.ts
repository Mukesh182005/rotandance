import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: { role: true, committee: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const member = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true, committee: true, attendances: true },
    });
    if (!member) throw new NotFoundException('Member not found.');
    return member;
  }

  async updateStatus(id: string, status: 'ACTIVE' | 'PENDING' | 'SUSPENDED') {
    const member = await this.prisma.user.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Member not found.');

    return this.prisma.user.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
