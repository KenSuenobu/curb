import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiOkResponse,
  ApiOperation, ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {GuestDto} from 'curb-db/dist';
import { GuestService } from 'src/services/guest.service';

@ApiTags('guest')
@Controller('guest')
export class GuestController {
  private readonly logger = new Logger('guest.controller');

  constructor(private readonly service: GuestService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new Guest',
    description: 'Creates a new Guest entry',
  })
  @ApiBody({
    description: 'The Guest object to create',
    type: GuestDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createGuest(@Body() payload: GuestDto): Promise<boolean> {
    return this.service.createGuest(payload);
  }

  @Put('/edit')
  @ApiOperation({
    summary: 'Saves a Guest',
    description: 'Saves a Guest entry',
  })
  @ApiBody({
    description: 'The Guest object to save',
    type: GuestDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async saveGuest(@Body() payload: GuestDto): Promise<boolean> {
    return this.service.saveGuest(payload);
  }

  @Get('/list-all/:fleetId/:blacklisted')
  @ApiOperation({
    summary: 'Lists guests',
    description: 'Lists guests either white or blacklisted for a fleet',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: String,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listGuests(@Param('blacklisted') blacklisted: boolean, @Param('fleetId') fleetId: number): Promise<GuestDto[]> {
    return this.service.listGuests(blacklisted, fleetId);
  }

  @Get('/list-all/:fleetId')
  @ApiOperation({
    summary: 'Lists all guests for a fleet ID',
    description: 'Lists all guests regardless of blacklisted status by Fleet ID',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: String,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listAllGuests(@Param('fleetId') fleetId: number): Promise<GuestDto[]> {
    return this.service.listAllGuests(fleetId);
  }

  @Get('/get/:id')
  @ApiOperation({
    summary: 'Gets the data for a user by ID',
    description: 'Retrieves all user data for a user by the guest ID',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: GuestDto,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getGuest(@Param('id') id: number): Promise<GuestDto> {
    return this.service.getGuest(id);
  }

}