import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { QrService } from './qr.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('qr')
export class QrController {
  constructor(private qrService: QrService) {}

  @Roles('Super Admin', 'President', 'Vice President', 'Secretary', 'Event Coordinator')
  @Post('generate')
  async generate(@Body() body: { eventId: string; expiresInMinutes?: number }) {
    return this.qrService.generateToken(body.eventId, body.expiresInMinutes);
  }

  @Post('verify')
  async verify(@Body() body: { qrToken: string }) {
    return this.qrService.verifyToken(body.qrToken);
  }
}
