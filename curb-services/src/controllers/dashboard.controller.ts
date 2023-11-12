import {ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {Controller, Get, HttpStatus, Logger, Param} from '@nestjs/common';
import {DashboardService} from '../services/dashboard.service';
import {CarYearDto} from 'curb-db/dist';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  private readonly logger = new Logger('dashboard.controller');

  constructor(private readonly service: DashboardService) {}

  @Get('/list/:userId')
  @ApiOperation({
    summary: 'Lists car information for user ID',
    description: 'Returns a list of all cars and related information about the car',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Object,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async list(@Param('userId') userId: string): Promise<any[]> {
    return this.service.list(userId);
  }

  @Get('/car-definitions/:userId')
  @ApiOperation({
    summary: 'Lists stats for car definitions by user ID',
    description: 'Returns a list of car definition statistics by the user ID - total trims, and total contributed trims',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Object,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async carDefinitionsDashboard(@Param('userId') userId: number): Promise<any> {
    return this.service.carDefinitionsDashboard(userId);
  }

}