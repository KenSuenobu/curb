import {BaseDao} from './base.dao';
import {LoanPaymentDto} from '../dto/loan-payment.dto';
import {Logger} from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import {DaoUtils} from './dao-utils.dao';

export class LoanPaymentDao  extends BaseDao<LoanPaymentDto> {
  private readonly logger = new Logger('loan-payment.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.loan_payment');
  }

  async getLoanPaymentsForFleetCarId(id: number): Promise<LoanPaymentDto[]> {
    const sqlStatement = `SELECT * FROM ${this.section} WHERE fleet_car_loan_id=$1 ORDER BY id DESC`;

    return (await this.db.any<LoanPaymentDto>(sqlStatement, [ id, ]))
      .map((x) => DaoUtils.normalizeFields<LoanPaymentDto>(x));
  }

  async summationByFleetCarId(fleetCarId: number): Promise<number> {
    const sqlStatement = `SELECT SUM(b.total_amount) AS total_amount FROM curb.fleet_car_loan a, curb.loan_payment b WHERE a.fleet_car_id=$1 AND b.fleet_car_loan_id=a.id`;

    return await this.db.oneOrNone(sqlStatement, [ fleetCarId ])
      .then((x) => x ? x['total_amount'] : 0.00);
  }

  async edit(id: number, payload: LoanPaymentDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET fleet_car_loan_id=$1, payment_date=$2, principal_amount=$3, interest_amount=$4, total_amount=$5 WHERE id=$6`;

    return this.db
      .none(sqlStatement, [
        payload.fleetCarLoanId,
        payload.paymentDate,
        payload.principalAmount,
        payload.interestAmount,
        payload.totalAmount,
        id,
      ])
      .then(() => true)
      .catch((x) => {
        this.logger.error('Unable to save LoanPaymentDto', x);
        return false;
      });
  }

  async create(payload: LoanPaymentDto): Promise<LoanPaymentDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (fleet_car_loan_id, payment_date, principal_amount, interest_amount, total_amount) ` +
      'VALUES ($1, $2, $3, $4, $5) RETURNING *';

    return (await this.db.oneOrNone(sqlStatement, [
      payload.fleetCarLoanId,
      payload.paymentDate,
      payload.principalAmount,
      payload.interestAmount,
      payload.totalAmount,
    ]))
    .then((x) => DaoUtils.normalizeFields<LoanPaymentDto>(x));
  }

}