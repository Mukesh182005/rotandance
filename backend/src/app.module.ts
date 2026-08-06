import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { EventsModule } from './events/events.module';
import { AttendanceModule } from './attendance/attendance.module';
import { QrModule } from './qr/qr.module';
import { UploadsModule } from './uploads/uploads.module';
import { GalleryModule } from './gallery/gallery.module';
import { ReportsModule } from './reports/reports.module';
import { BackupModule } from './backup/backup.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MembersModule,
    EventsModule,
    AttendanceModule,
    QrModule,
    UploadsModule,
    GalleryModule,
    ReportsModule,
    BackupModule,
    NotificationsModule,
  ],
})
export class AppModule {}
