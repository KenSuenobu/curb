import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put} from "@nestjs/common";
import {ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {CarMakeService} from "../services/car-make.service";
import {CarMakeDto, FleetCarDto, FleetDto} from 'curb-db/dist/dto';
import {FleetService} from '../services/fleet.service';
import {FleetCarLoanDto, FleetMembershipDto} from 'curb-db/dist';

@ApiTags('fleet')
@Controller('fleet')
export class FleetController {
  private readonly logger = new Logger('fleet.controller');

  constructor(private readonly service: FleetService) {}

  @Post('/create/fleet/:userId')
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
  async createFleet(@Param('userId') userId: number, @Body() payload: FleetDto): Promise<FleetDto> {
    return this.service.createFleet(userId, payload);
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

  @Post('/create/loan')
  @ApiOperation({
    summary: 'Create a new Fleet Car Loan object',
    description: 'Creates a new fleet car loan association with a fleet car',
  })
  @ApiBody({
    description: 'The FleetCarLoan object to create',
    type: FleetCarLoanDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createFleetCarLoan(@Body() payload: FleetCarLoanDto): Promise<FleetCarLoanDto> {
    return this.service.createFleetCarLoan(payload);
  }

  @Post('/create/membership')
  @ApiOperation({
    summary: 'Assigns a user to a fleet',
    description: 'Assigns a user by ID to a fleet by ID',
  })
  @ApiBody({
    description: 'The FleetMembership object to create',
    type: FleetMembershipDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async assignUserToFleet(@Body() payload: FleetMembershipDto): Promise<FleetMembershipDto> {
    return this.service.assignUserToFleet(payload);
  }

  @Put('/membership/:fleetId/:email')
  @ApiOperation({
    summary: 'Assigns a member to a fleet',
    description: 'Assigns a member by e-mail address to a fleet by its ID'
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: FleetDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async addEmailToFleet(@Param('fleetId') fleetId: number, @Param('email') email: string): Promise<boolean> {
    return this.service.addEmailToFleet(fleetId, email);
  }

  @Get('/list/:userId')
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
  async listFleetsByUser(@Param('userId') userId: number): Promise<FleetDto[]> {
    return this.service.listFleetsByUser(userId);
  }

  @Get('/loan/:fleetCarId')
  @ApiOperation({
    summary: 'Retrieves a loan by ID',
    description: 'Retrieves a FleetCarLoan object by its accompanying fleet car ID',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: FleetCarLoanDto,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getFleetCarLoan(@Param('fleetCarId') fleetCarId: number): Promise<FleetCarLoanDto> {
    return this.service.getFleetCarLoan(fleetCarId);
  }

  @Put('/save/car')
  @ApiOperation({
    summary: 'Saves a FleetCar object',
    description: 'Saves an existing FleetCar object.'
  })
  @ApiBody({
    description: 'The FleetCar object to save',
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

  @Put('/save/loan')
  @ApiOperation({
    summary: 'Saves a FleetCarLoan object',
    description: 'Saves an existing FleetCarLoan object.',
  })
  @ApiBody({
    description: 'The FleetCarLoan object to save',
    type: FleetCarLoanDto,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async saveCarFleetLoan(@Body() payload: FleetCarLoanDto): Promise<boolean> {
    return this.service.saveCarFleetLoan(payload);
  }

  @Get('/list/fleet/:fleetId')
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

  @Get('/list/fleet/:fleetId/members')
  @ApiOperation({
    summary: 'Lists all members by fleet ID',
    description: 'Retrieves a list of all members that are a member of Fleet by ID',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: String,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listFleetMembers(@Param('fleetId') fleetId: number): Promise<string[]> {
    return this.service.listFleetMembers(fleetId);
  }

}