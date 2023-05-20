import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApplicationStatus } from '@prisma/client';
import { UpdateApplicationDto } from './dto/UpdateApplication.dto';
import { ApplicationCreate } from './contracts/appllications.create';

@Injectable()
export class ApplicationsRepository {
  constructor(private prisma: PrismaService) {}

  async createApplication(dto: ApplicationCreate.Request, applicantId: number) {
    const { message } = dto;
    const applicationMatch = await this.prisma.application.findFirst({
      where: { applicantId, message, status: ApplicationStatus.ACTIVE },
    });

    if (applicationMatch) {
      throw new HttpException('Exact application already exists', 400);
    }

    const newApplication = await this.prisma.application.create({
      data: {
        message,
        applicant: {
          connect: { id: applicantId },
        },
      },
      include: {
        applicant: true,
      },
    });

    return newApplication;
  }

  async getApplicationById(id: number) {
    const application = await this.prisma.application.findFirst({
      where: { id },
      include: {
        staffMember: true,
        applicant: true,
      },
    });

    if (!application) {
      throw new HttpException('Application not found', 404);
    }

    return application;
  }

  async updateApplication(dto: UpdateApplicationDto, id: number) {
    const application = await this.prisma.application.findFirst({
      where: { id },
    });

    if (!application) {
      throw new HttpException('Application not found', 404);
    }

    const newApplication = await this.prisma.application.update({
      where: { id },
      data: dto,
      include: {
        staffMember: true,
        applicant: true,
      },
    });

    return newApplication;
  }

  async getApplicationByFilters(filters: Record<string, any>) {
    return await this.prisma.application.findMany({
      where: filters,
      include: { staffMember: true, applicant: true },
    });
  }
}
