import {Body, Controller, Get, HttpStatus, Logger, Param, Post } from "@nestjs/common";
import {ApiConflictResponse,ApiForbiddenResponse,  ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";
import { CarModelDto } from "curb-db/dist/dto";
import {CarMakeService} from '../services/car-make.service';
import {CarModelService} from '../services/car-model.service';

@ApiTags('car-model')
@Controller('car-model')
export class CarModelController {
  private readonly logger = new Logger('car-model.controller');

  constructor(private readonly service: CarModelService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new CarModel object',
    description: 'Creates a new model of car associated with the car make by ID',
  })
  @ApiBody({
    description: 'The car model object to create',
    type: CarModelDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CarModelDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createCarModel(@Body() payload: CarModelDto): Promise<CarModelDto> {
    return this.service.createCarModel(payload);
  }

  @Get('/list/:carMakeId')
  @ApiOperation({
    summary: 'Lists models by make ID',
    description: 'Returns a list of all CarModelDto objects based on the make ID of the CarMakeDto',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: CarModelDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listModelsByMakeId(@Param('carMakeId') carMakeId: number): Promise<CarModelDto[]> {
    return this.service.listByMakeId(carMakeId);
  }

}