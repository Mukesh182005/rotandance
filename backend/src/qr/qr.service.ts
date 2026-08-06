import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QrService {
  constructor(private jwtService: JwtService) {}

  generateToken(eventId: string, expiresInMinutes: number = 15) {
    const payload = { eventId, type: 'EVENT_QR', nonce: Date.now() };
    const qrToken = this.jwtService.sign(payload, {
      expiresIn: `${expiresInMinutes}m`,
    });
    return { qrToken, eventId, expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000) };
  }

  verifyToken(qrToken: string) {
    try {
      const payload = this.jwtService.verify(qrToken);
      if (payload.type !== 'EVENT_QR') {
        throw new BadRequestException('Invalid QR token payload format.');
      }
      return { valid: true, eventId: payload.eventId };
    } catch (err) {
      throw new BadRequestException('QR token expired or invalid signature.');
    }
  }
}
