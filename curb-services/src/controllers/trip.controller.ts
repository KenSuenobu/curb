import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put} from '@nestjs/common';
import {TripService} from '../services/trip.service';
import {TripDto} from 'curb-db/dist';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  private readonly logger = new Logger('trip.controller');

  constructor(private readonly service: TripService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new Trip',
    description: 'Creates a new Trip entry',
  })
  @ApiBody({
    description: 'The Trip object to create',
    type: TripDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: TripDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createTrip(@Body() payload: TripDto): Promise<TripDto> {
    return this.service.create(payload);
  }

  @Put('/edit')
  @ApiOperation({
    summary: 'Saves a Trip',
    description: 'Saves a Trip entry',
  })
  @ApiBody({
    description: 'The Trip object to save',
    type: TripDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async saveTrip(@Body() payload: TripDto): Promise<boolean> {
    return this.service.edit(payload);
  }

  @Get('/list/upcoming')
  @ApiOperation({
    summary: 'Retrieves upcoming trips',
    description: 'Retrieves a list of upcoming trips',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TripDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getUpcomingTrips(): Promise<TripDto[]> {
    return this.service.getUpcomingTrips();
  }

  @Get('/list/past')
  @ApiOperation({
    summary: 'Retrieves past trips',
    description: 'Retrieves a list of past trips',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TripDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getPastTrips(): Promise<TripDto[]> {
    return this.service.getPastTrips();
  }

  @Get('/list/current')
  @ApiOperation({
    summary: 'Retrieves current trips',
    description: 'Retrieves a list of currently in progress trips',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TripDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getCurrentTrips(): Promise<TripDto[]> {
    return this.service.getCurrentTrips();
  }

  @Get('/list/car/:fleetCarId')
  @ApiOperation({
    summary: 'Retrieves trips by fleet car ID',
    description: 'Retrieves a list of trips on a per-car basis',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TripDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getTripsForFleetCarId(@Param('fleetCarId') fleetCarId: number): Promise<TripDto[]> {
    return this.service.getTripsForFleetCarId(fleetCarId);
  }

}