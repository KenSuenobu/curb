import {Body, Controller, Get, HttpStatus, Logger, Param, Post } from "@nestjs/common";
import {ApiConflictResponse,ApiForbiddenResponse,  ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";
import {CarModelDto, CarTrimDto} from 'curb-db/dist/dto';
import { CarTrimService } from "src/services/car-trim.service";
import {CarMakeService} from '../services/car-make.service';
import {CarModelService} from '../services/car-model.service';

@ApiTags('car-trim')
@Controller('car-trim')
export class CarTrimController {
  private readonly logger = new Logger('car-trim.controller');

  constructor(private readonly service: CarTrimService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new CarTrim object',
    description: 'Creates a new trim of car associated with the car year by ID',
  })
  @ApiBody({
    description: 'The car trim object to create',
    type: CarTrimDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CarTrimDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createCarTrim(@Body() payload: CarTrimDto): Promise<CarTrimDto> {
    return this.service.createCarTrim(payload);
  }

  @Get('/list/:carYearId')
  @ApiOperation({
    summary: 'Lists models by year ID',
    description: 'Returns a list of all CarTrimDto objects based on the year ID of the CarYearDto',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: CarTrimDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listTrimsByYearId(@Param('carYearId') carYearId: number): Promise<CarTrimDto[]> {
    return this.service.listByYearId(carYearId);
  }

}