import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('checkin')
  async checkIn(
    @CurrentUser('id') userId: string,
    @Body() body: { eventId: string; device?: string; location?: string },
  ) {
    return this.attendanceService.checkInQR(userId, body.eventId, body.device, body.location);
  }

  @Roles('Super Admin', 'President', 'Vice President', 'Secretary', 'Event Coordinator')
  @Post('manual')
  async markManual(
    @Body() body: { userId: string; eventId: string; status: 'PRESENT' | 'LATE' | 'EXCUSED' },
  ) {
    return this.attendanceService.markManual(body.userId, body.eventId, body.status);
  }

  @Get('event/:id')
  async findByEvent(@Param('id') eventId: string) {
    return this.attendanceService.findByEvent(eventId);
  }

  @Get('member/:id')
  async findByMember(@Param('id') userId: string) {
    return this.attendanceService.findByMember(userId);
  }
}
