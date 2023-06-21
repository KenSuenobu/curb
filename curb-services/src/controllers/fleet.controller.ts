import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put} from "@nestjs/common";
import {ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {CarMakeService} from "../services/car-make.service";
import {CarMakeDto, FleetCarDto, FleetDto} from 'curb-db/dist/dto';
import {FleetService} from '../services/fleet.service';

@ApiTags('fleet')
@Controller('fleet')
export class FleetController {
  private readonly logger = new Logger('fleet.controller');

  constructor(private readonly service: FleetService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new Fleet object',
    description: 'Creates a new fleet',
  })
  @ApiBody({
    description: 'The Fleet object to create',
    type: FleetDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: FleetDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createFleet(@Body() payload: FleetDto): Promise<FleetDto> {
    return this.service.createFleet(payload);
  }

  @Post('/create/car')
  @ApiOperation({
    summary: 'Create a new Fleet Car object',
    description: 'Creates a new fleet car association with a fleet',
  })
  @ApiBody({
    description: 'The FleetCar object to create',
    type: FleetCarDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: FleetCarDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createFleetCar(@Body() payload: FleetCarDto): Promise<FleetCarDto> {
    return this.service.createFleetCar(payload);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Lists all Fleet objects',
    description: 'Retrieves a list of all `Fleet` objects.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: FleetDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listCarMakes(): Promise<FleetDto[]> {
    return this.service.listFleets();
  }

  @Put('/save/car')
  @ApiOperation({
    summary: 'Saves a FleetCar object',
    description: 'Saves an existing FleetCar object.'
  })
  @ApiBody({
    description: 'The FleetCar object to create',
    type: FleetCarDto,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async saveCarFleet(@Body() payload: FleetCarDto): Promise<boolean> {
    return this.service.saveCarFleet(payload);
  }

  @Get('/list/:fleetId')
  @ApiOperation({
    summary: 'Lists all FleetCar objects by fleet ID',
    description: 'Retrieves a list of all of the fleet cars associated with a fleet ID.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: FleetCarDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listFleetCars(@Param('fleetId') fleetId: number): Promise<FleetCarDto[]> {
    return this.service.listFleetCars(fleetId);
  }

}