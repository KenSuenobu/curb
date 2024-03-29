import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put} from '@nestjs/common';
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

  @Get('/list/upcoming/:fleetId')
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
  async getUpcomingTrips(@Param('fleetId') fleetId: number): Promise<TripDto[]> {
    return this.service.getUpcomingTrips(fleetId);
  }

  @Get('/list/past/:fleetId')
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
  async getPastTrips(@Param('fleetId') fleetId: number): Promise<TripDto[]> {
    return this.service.getPastTrips(fleetId);
  }

  @Get('/list/current/:fleetId')
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
  async getCurrentTrips(@Param('fleetId') fleetId: number): Promise<TripDto[]> {
    return this.service.getCurrentTrips(fleetId);
  }

  @Get('/list/guest/:guestId')
  @ApiOperation({
    summary: 'Retrieves trips by guest ID',
    description: 'Retrieves a list of trips on a per-guest basis',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TripDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getTripsForGuestId(@Param('guestId') guestId: number): Promise<TripDto[]> {
    return this.service.getTripsForGuestId(guestId);
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

  @Post('/find')
  @ApiOperation({
    summary: 'Searches for a trip',
    description: 'Searches for a trip by fleet car ID and trip date',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TripDto,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async find(@Body() payload: any): Promise<TripDto> {
    return this.service.find(payload);
  }

  @Delete('/:tripId')
  @ApiOperation({
    summary: 'Deletes a trip by ID',
    description: 'Deletes a trip by its trip ID',
  })
  @ApiOkResponse({
    status: HttpStatus.ACCEPTED,
    type: Boolean,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async delete(@Param('tripId') tripId: number): Promise<boolean> {
    return this.service.delete(tripId);
  }

  @Get('/:tripId')
  @ApiOperation({
    summary: 'Gets a trip by ID',
    description: 'Gets a trip by its trip ID',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: TripDto,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async get(@Param('tripId') tripId: number): Promise<TripDto> {
    return this.service.get(tripId);
  }

}