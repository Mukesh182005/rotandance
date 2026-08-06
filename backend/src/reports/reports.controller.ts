import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Roles('Super Admin', 'President', 'Vice President', 'Secretary', 'Board Member')
  @Get('event/:id')
  async getEventReport(@Param('id') eventId: string) {
    return this.reportsService.getEventReport(eventId);
  }

  @Get('member/:id')
  async getMemberReport(@Param('id') userId: string) {
    return this.reportsService.getMemberReport(userId);
  }

  @Roles('Super Admin', 'President', 'Vice President', 'Secretary')
  @Get('monthly')
  async getMonthlySummary() {
    return this.reportsService.getMonthlySummary();
  }
}
