import {Logger} from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import {FleetCarLoanDto} from '../dto';
import {DaoUtils} from './dao-utils.dao';
import {BaseDao} from './base.dao';

export class FleetCarLoanDao extends BaseDao<FleetCarLoanDto> {
  private readonly logger = new Logger('fleet-car-loan.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.fleet_car_loan');
  }

  async getByFleetCarId(fleetCarId: number): Promise<FleetCarLoanDto> {
    const sqlStatement: string = 'SELECT * FROM curb.fleet_car_loan WHERE fleet_car_id=$1';
    const results = await this.db.oneOrNone(sqlStatement, [fleetCarId,]);

    if (results) {
      return DaoUtils.normalizeFields<FleetCarLoanDto>(results);
    }

    return null;
  }

  async edit(id: number, payload: FleetCarLoanDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET fleet_car_id=$1, data=$2 WHERE id=$3`;

    return this.db
      .none(sqlStatement, [
        payload.fleetCarId,
        payload.data,
        id,
      ])
      .then(() => true)
      .catch((x) => {
        this.logger.error('Unable to save FleetCarLoanDto', x);
        return false;
      });
  }

  async create(payload: FleetCarLoanDto): Promise<FleetCarLoanDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (fleet_car_id, data) VALUES ($1, $2) RETURNING *`;

    return (await this.db.oneOrNone(sqlStatement, [ payload.fleetCarId, payload.data, ]))
      .then((x) => DaoUtils.normalizeFields<FleetCarLoanDto>(x));
  }

}