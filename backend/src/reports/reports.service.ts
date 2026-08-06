import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getEventReport(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        attendances: { include: { user: true } },
      },
    });
    return {
      eventId: event?.id,
      title: event?.title,
      totalAttendees: event?.attendances.length || 0,
      attendees: event?.attendances.map((a) => ({
        name: a.user.name,
        email: a.user.email,
        status: a.status,
        checkInTime: a.checkInTime,
        method: a.method,
      })),
    };
  }

  async getMemberReport(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        attendances: { include: { event: true } },
      },
    });

    return {
      userId: user?.id,
      name: user?.name,
      email: user?.email,
      totalEventsAttended: user?.attendances.length || 0,
      history: user?.attendances.map((a) => ({
        eventTitle: a.event.title,
        date: a.event.startTime,
        status: a.status,
      })),
    };
  }

  async getMonthlySummary() {
    const events = await this.prisma.event.findMany({
      include: { _count: { select: { attendances: true } } },
      orderBy: { startTime: 'desc' },
      take: 20,
    });
    return { summaryDate: new Date(), events };
  }
}
