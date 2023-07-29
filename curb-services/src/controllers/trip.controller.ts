import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Controller, HttpStatus, Logger, Post, Put} from '@nestjs/common';
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
  async createTrip(payload: TripDto): Promise<TripDto> {
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
  async saveTrip(payload: TripDto): Promise<boolean> {
    return this.service.edit(payload);
  }

}