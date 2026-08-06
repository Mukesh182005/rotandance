import { Controller, Post, Get, Delete, Param, UseGuards, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('gallery')
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @CurrentUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('eventId') eventId?: string,
  ) {
    return this.galleryService.uploadPhoto(userId, eventId, file);
  }

  @Get('event/:id')
  async findByEvent(@Param('id') eventId: string) {
    return this.galleryService.findByEvent(eventId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }
}
