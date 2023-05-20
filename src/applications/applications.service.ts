import { Injectable } from '@nestjs/common';
import { ApplicationsRepository } from './applications.repository';
import { MailService } from 'src/mail/mail.service';
import { UpdateApplicationDto } from './dto/UpdateApplication.dto';
import { ApplicationCreate } from './contracts/appllications.create';
import { ApplicationComment } from './contracts/applications.comment';
import { ApplicationDto } from './dto/Application.dto';
import { ApplicationFiltersDto } from './dto/ApplicationFilters.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private repository: ApplicationsRepository,
    private mailService: MailService,
  ) {}

  async createApplication(dto: ApplicationCreate.Request, applicantId: number) {
    const app = await this.repository.createApplication(dto, applicantId);
    ApplicationDto.create(app);
  }

  async getApplicationById(id: number) {
    const app = await this.repository.getApplicationById(id);
    return ApplicationDto.create(app);
  }

  async commentApplication(
    dto: ApplicationComment.Request,
    id: number,
    staffMemberId: number,
  ) {
    const data = UpdateApplicationDto.create({ ...dto, staffMemberId });
    return this.repository.updateApplication(data, id);
  }

  async getApplicationByFilters(filters: ApplicationFiltersDto) {
    const queryFilters = {};

    if (filters.deleted) {
      queryFilters['deleted'] = filters.deleted;
    }

    if (filters.status) {
      queryFilters['status'] = filters.status;
    }

    if (filters.from) {
      queryFilters['createdAt']['gte'] = filters.from;
    }

    if (filters.to) {
      queryFilters['createdAt']['lte'] = filters.to;
    }

    const apps = await this.repository.getApplicationByFilters(queryFilters);
    return apps.map(ApplicationDto.create);
  }

  async deleteApplication(id: number) {
    const data = UpdateApplicationDto.create({ deleted: true });
    await this.repository.updateApplication(data, id);
  }

  async attachApplicationToStaffMember(id: number, staffMemberId: number) {
    const data = UpdateApplicationDto.create({ staffMemberId });
    await this.repository.updateApplication(data, id);
    this.mailService.onAttachedToApplicationMail(id);
  }
}
