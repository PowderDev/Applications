import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ApplicationsModule } from './applications/applications.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RedisModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ApplicationsModule,
    MailModule,
  ],
})
export class AppModule {}
