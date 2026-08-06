import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class GalleryService {
  constructor(
    private prisma: PrismaService,
    private uploadsService: UploadsService,
  ) {}

  async uploadPhoto(userId: string, eventId: string | undefined, file: Express.Multer.File) {
    const { imageUrl, thumbnailUrl } = await this.uploadsService.compressAndConvertWebP(
      file.buffer,
      file.originalname,
    );

    return this.prisma.image.create({
      data: {
        eventId,
        imageUrl,
        thumbnail: thumbnailUrl,
        size: file.size,
        uploadedById: userId,
      },
      include: { uploadedBy: true, event: true },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.image.findMany({
      where: { eventId },
      include: { uploadedBy: true },
      orderBy: { uploadedAt: 'desc' },
    });
  }

  async delete(id: string) {
    const image = await this.prisma.image.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('Gallery image not found.');
    return this.prisma.image.delete({ where: { id } });
  }
}
