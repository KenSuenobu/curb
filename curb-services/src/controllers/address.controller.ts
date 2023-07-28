import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put} from '@nestjs/common';
import {DeliveryAddressDto} from 'curb-db/dist';
import {AddressService} from '../services/address.service';

@ApiTags('address')
@Controller('address')
export class AddressController {
  private readonly logger = new Logger('address.controller');

  constructor(private readonly service: AddressService) {}

  @Post('/delivery/create')
  @ApiOperation({
    summary: 'Creates a new DeliveryAddress object',
    description: 'Creates a address for a delivery location',
  })
  @ApiBody({
    description: 'The DeliveryAddress object to create',
    type: DeliveryAddressDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createDeliveryAddress(@Body() payload: DeliveryAddressDto): Promise<boolean> {
    return this.service.createDeliveryAddress(payload);
  }

  @Put('/delivery/edit')
  @ApiOperation({
    summary: 'Saves a DeliveryAddress object',
    description: 'Saves a address for a delivery location',
  })
  @ApiBody({
    description: 'The DeliveryAddress object to save',
    type: DeliveryAddressDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: Boolean,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async saveDeliveryAddress(@Body() payload: DeliveryAddressDto): Promise<boolean> {
    return this.service.saveDeliveryAddress(payload);
  }

  @Get('/delivery/list/:fleetId')
  @ApiOperation({
    summary: 'Lists DeliveryAddress objects by fleet ID',
    description: 'Retrieves a list of all `DeliveryAddress` objects by fleet ID.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: DeliveryAddressDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listDeliveryAddressesForFleetId(@Param('fleetId') fleetId: number): Promise<DeliveryAddressDto[]> {
    return this.service.listDeliveryAddressesForFleetId(fleetId);
  }

}