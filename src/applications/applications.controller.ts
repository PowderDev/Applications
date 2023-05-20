import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { RequestWithUser } from 'src/auth/dto/requestWithUser';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicationCreate } from './contracts/appllications.create';
import { ApplicationComment } from './contracts/applications.comment';
import { ApplicationDto } from './dto/Application.dto';
import { ApplicationFiltersDto } from './dto/ApplicationFilters.dto';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private service: ApplicationsService) {}

  @Get('/')
  @Roles(UserRole.STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get applications by filters' })
  @ApiOkResponse({ type: [ApplicationDto] })
  async getFilteredApplications(@Query() query: ApplicationFiltersDto) {
    const filters = ApplicationFiltersDto.create(query);
    return this.service.getApplicationByFilters(filters);
  }

  @Get(':id')
  @Roles(UserRole.STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get application by id' })
  @ApiOkResponse({ type: ApplicationDto })
  async getApplicationById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getApplicationById(id);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ApplicationCreate.Response })
  @ApiOperation({ summary: 'Create application' })
  async createApplication(
    @Body() dto: ApplicationCreate.Request,
    @Req() req: RequestWithUser,
  ) {
    return this.service.createApplication(dto, req.user.id);
  }

  @Put(':id')
  @Roles(UserRole.STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: ApplicationComment.Response })
  @ApiOperation({ summary: 'Comment application' })
  async commentApplication(
    @Body() dto: ApplicationComment.Request,
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.commentApplication(dto, id, req.user.id);
  }

  @Delete(':id')
  @Roles(UserRole.STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete application' })
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteApplication(id);
  }

  @Put(':id/attach/:staffMemberId')
  @Roles(UserRole.STAFF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Attach Staff member to an application' })
  async attachApplication(
    @Param('id', ParseIntPipe) id: number,
    @Param('staffMemberId', ParseIntPipe) staffMemberId: number,
  ) {
    return this.service.attachApplicationToStaffMember(id, staffMemberId);
  }
}
