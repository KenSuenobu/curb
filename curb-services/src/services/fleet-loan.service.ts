import {Injectable, Logger} from '@nestjs/common';
import {LoanPaymentDto} from 'curb-db/dist/dto/loan-payment.dto';
import {LoanPaymentDao} from 'curb-db/dist';
import {DaoUtils} from 'curb-db/dist/dao/dao-utils.dao';

@Injectable()
export class FleetLoanService {
  private readonly logger = new Logger('fleet-loan.service');

  async createLoanPayment(payload: LoanPaymentDto): Promise<LoanPaymentDto> {
    const dao = new LoanPaymentDao(DaoUtils.getDatabase());
    return dao.create(payload);
  }

  async listPaymentsForFleetCarId(id: number): Promise<LoanPaymentDto[]> {
    const dao = new LoanPaymentDao(DaoUtils.getDatabase());
    return dao.getLoanPaymentsForFleetCarId(id);
  }

}