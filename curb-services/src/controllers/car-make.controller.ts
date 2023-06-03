import {Body, Controller, Get, HttpStatus, Logger, Post} from "@nestjs/common";
import {ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {CarMakeService} from "../services/car-make.service";
import {CarMakeDto} from "curb-db/dist/dto";

@ApiTags('car-make')
@Controller('car-make')
export class CarMakeController {
  private readonly logger = new Logger('car-make.controller');

  constructor(private readonly service: CarMakeService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new CarMake object',
    description: 'Creates a new make of car',
  })
  @ApiBody({
    description: 'The CarMake object to create',
    type: CarMakeDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CarMakeDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createCarMake(@Body() payload: CarMakeDto): Promise<CarMakeDto> {
    return this.service.createCarMake(payload);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Lists all CarMake objects',
    description: 'Retrieves a list of all `CarMake` objects.',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: CarMakeDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listCarMakes(): Promise<CarMakeDto[]> {
    return this.service.listCarMakes();
  }

}