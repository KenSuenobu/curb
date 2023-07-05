import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Body, Controller, Get, HttpStatus, Logger, Param, Post} from '@nestjs/common';
import {FleetLoanService} from '../services/fleet-loan.service';
import {FleetCarLoanDto, FleetDto} from 'curb-db/dist';
import {LoanPaymentDto} from 'curb-db/dist/dto/loan-payment.dto';

@ApiTags('fleet-loan')
@Controller('fleet-loan')
export class FleetLoanController {
  private readonly logger = new Logger('fleet-loan.controller');

  constructor(private readonly service: FleetLoanService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Creates a new LoanPayment object',
    description: 'Creates a new loan payment',
  })
  @ApiBody({
    description: 'The LoanPayment object to create',
    type: LoanPaymentDto,
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    type: LoanPaymentDto,
  })
  @ApiConflictResponse()
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async createLoanPayment(@Body() payload: LoanPaymentDto): Promise<LoanPaymentDto> {
    return this.service.createLoanPayment(payload);
  }

  @Get('/list/:id')
  @ApiOperation({
    summary: 'Lists loan payment objects by the fleet car ID',
    description: 'Retrieves a list of LoanPaymentDto object by its accompanying fleet car ID',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: FleetCarLoanDto,
  })
  @ApiForbiddenResponse()
  @ApiUnauthorizedResponse()
  async listPaymentsForFleetId(@Param('id') id: number): Promise<LoanPaymentDto[]> {
    return this.service.listPaymentsForFleetCarId(id);
  }

}