import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Put } from "@nestjs/common";
import {ApiConflictResponse,ApiForbiddenResponse,  ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger";
import {CarModelDto, CarTrimDto, CarTrimInfoDto} from 'curb-db/dist/dto';
import { CarTrimInfoService } from "src/services/car-trim-info.service";
import { CarTrimService } from "src/services/car-trim.service";
import {CarMakeService} from '../services/car-make.service';
import {CarModelService} from '../services/car-model.service';

@ApiTags('car-trim-info')
@Controller('car-trim-info')
export class CarTrimInfoController {
  private readonly logger = new Logger('car-trim-info.controller');

  constructor(private readonly service: CarTrimInfoService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new CarTrimInfo object',
    description: 'Creates a new trim info of a car associated with the car trim by ID',
  })
  @ApiBody({
    description: 'The car trim info object to create',
    type: CarTrimInfoDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: CarTrimInfoDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createCarTrim(@Body() payload: CarTrimInfoDto): Promise<CarTrimInfoDto> {
    return this.service.createCarTrimInfo(payload);
  }

  @Put('/edit/:trimInfoId')
  @ApiOperation({
    summary: 'Edits a CarTrimInfo object',
    description: 'Edits a CarTrimInfo object by its ID',
  })
  @ApiBody({
    description: 'The car trim info object to edit',
    type: CarTrimInfoDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async editCarTrim(@Body() payload: CarTrimInfoDto, @Param('trimInfoId') trimInfoId: number): Promise<boolean> {
    return this.service.editCarTrimInfo(trimInfoId, payload);
  }

  @Get('/get/:trimId')
  @ApiOperation({
    summary: 'Retrieves a CarTrimInfoDto by the trim ID',
    description: 'Returns a list of all CarTrimInfoDto objects based on the trim ID of the CarTrimDto',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: CarTrimDto,
    isArray: true,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async getTrimInfoByTrimId(@Param('trimId') trimId: number): Promise<CarTrimInfoDto> {
    return this.service.getTrimInfoByTrimId(trimId);
  }

}