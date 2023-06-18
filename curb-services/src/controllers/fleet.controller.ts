import {Body, Controller, Get, HttpStatus, Logger, Post} from "@nestjs/common";
import {ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {CarMakeService} from "../services/car-make.service";
import {CarMakeDto, FleetDto} from "curb-db/dist/dto";
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

}