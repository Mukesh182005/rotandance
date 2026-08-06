import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get('upcoming')
  async findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Roles('Super Admin', 'President', 'Vice President', 'Secretary', 'Event Coordinator')
  @Post()
  async create(@CurrentUser('id') userId: string, @Body() body: any) {
    return this.eventsService.create(userId, body);
  }

  @Roles('Super Admin', 'President', 'Vice President', 'Secretary', 'Event Coordinator')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.eventsService.update(id, body);
  }

  @Roles('Super Admin', 'President')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
