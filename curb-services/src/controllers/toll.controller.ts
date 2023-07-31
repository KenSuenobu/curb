import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put} from '@nestjs/common';
import {TollService} from '../services/toll.service';
import {GuestDto, TollDto} from 'curb-db/dist';

@ApiTags('toll')
@Controller('toll')
export class TollController {

  private readonly logger = new Logger('toll.controller');

  constructor(private readonly service: TollService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new Toll',
    description: 'Creates a new Toll entry',
  })
  @ApiBody({
    description: 'The Toll object to create',
    type: TollDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createGuest(@Body() payload: TollDto): Promise<boolean> {
    return this.service.create(payload);
  }

  @Put('/edit')
  @ApiOperation({
    summary: 'Saves changes to a Toll',
    description: 'Edits and saves changes to an existing Toll',
  })
  @ApiBody({
    description: 'The Toll to edit',
    type: TollDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    type: Boolean,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async saveGuest(@Body() payload: TollDto): Promise<boolean> {
    return this.service.edit(payload);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Lists tolls',
    description: 'Gets a list of existing toll charges',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TollDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async list(): Promise<TollDto[]> {
    return this.service.list();
  }

  @Get('/list/:tripId')
  @ApiOperation({
    summary: 'Lists tolls by trip ID',
    description: 'Gets a list of existing toll charges by trip ID',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TollDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listByTripId(@Param('tripId') tripId: number): Promise<TollDto[]> {
    return this.service.listByTripId(tripId);
  }

}