import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async checkInQR(userId: string, eventId: string, device?: string, location?: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found.');

    const now = new Date();
    if (now < new Date(event.startTime.getTime() - 30 * 60 * 1000)) {
      throw new BadRequestException('Attendance window has not opened yet.');
    }

    const existing = await this.prisma.attendance.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existing) {
      throw new BadRequestException('Attendance already recorded for this event.');
    }

    return this.prisma.attendance.create({
      data: {
        userId,
        eventId,
        status: 'PRESENT',
        method: 'QR',
        device,
        location,
      },
      include: { user: true, event: true },
    });
  }

  async markManual(userId: string, eventId: string, status: 'PRESENT' | 'LATE' | 'EXCUSED') {
    return this.prisma.attendance.upsert({
      where: { userId_eventId: { userId, eventId } },
      update: { status, method: 'MANUAL' },
      create: { userId, eventId, status, method: 'MANUAL' },
      include: { user: true, event: true },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.attendance.findMany({
      where: { eventId },
      include: { user: true },
      orderBy: { checkInTime: 'desc' },
    });
  }

  async findByMember(userId: string) {
    return this.prisma.attendance.findMany({
      where: { userId },
      include: { event: true },
      orderBy: { checkInTime: 'desc' },
    });
  }
}
