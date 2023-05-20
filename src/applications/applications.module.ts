import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationsRepository } from './applications.repository';

@Module({
  providers: [ApplicationsService, ApplicationsRepository],
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
