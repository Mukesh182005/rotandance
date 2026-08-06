import { Controller, Get, Param, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  async findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Roles('Super Admin', 'President', 'Secretary')
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'ACTIVE' | 'PENDING' | 'SUSPENDED',
  ) {
    return this.membersService.updateStatus(id, status);
  }

  @Roles('Super Admin', 'President')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.membersService.delete(id);
  }
}
