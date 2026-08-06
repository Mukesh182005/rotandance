import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.event.findMany({
      include: { createdBy: true, _count: { select: { attendances: true } } },
      orderBy: { startTime: 'desc' },
    });
  }

  async findUpcoming() {
    return this.prisma.event.findMany({
      where: { startTime: { gte: new Date() }, status: 'UPCOMING' },
      include: { createdBy: true, _count: { select: { attendances: true } } },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { createdBy: true, attendances: { include: { user: true } }, images: true },
    });
    if (!event) throw new NotFoundException('Event not found.');
    return event;
  }

  async create(createdById: string, data: any) {
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        venue: data.venue,
        category: data.category || 'General',
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        poster: data.poster,
        createdById,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
