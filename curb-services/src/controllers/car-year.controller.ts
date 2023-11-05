import {Body, Controller, Get, HttpStatus, Logger, Param, Post } from "@nestjs/common";
import {ApiConflictResponse,ApiForbiddenResponse,  ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";
import {CarYearDto} from 'curb-db/dist/dto';
import {CarYearService} from '../services/car-year.service';

@ApiTags('car-year')
@Controller('car-year')
export class CarYearController {
  private readonly logger = new Logger('car-year.controller');

  constructor(private readonly service: CarYearService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new CarYear object',
    description: 'Creates a new year of car associated with the car model by ID',
  })
  @ApiBody({
    description: 'The car year object to create',
    type: CarYearDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CarYearDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createCarModel(@Body() payload: CarYearDto): Promise<CarYearDto> {
    return this.service.createCarYear(payload);
  }

  @Get('/list/:carModelId')
  @ApiOperation({
    summary: 'Lists years by model ID',
    description: 'Returns a list of all CarYearDto objects based on the make ID of the CarModelDto',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: CarYearDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listModelsByMakeId(@Param('carModelId') carModelId: number): Promise<CarYearDto[]> {
    return this.service.listByModelId(carModelId);
  }

}