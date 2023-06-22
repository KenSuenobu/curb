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

  async listByFleetId(fleetId: number): Promise<FleetCarLoanDto[]> {
    const sqlStatement: string = 'SELECT a.*, b.name AS trim_name, c.year AS car_year, ' +
      'd.name AS model_name, e.name AS make_name ' +
      '  FROM curb.fleet_car_loan a, curb.car_trim b, curb.car_year c, curb.car_model d, curb.car_make e' +
      ' WHERE b.id=a.car_trim_id ' +
      '   AND c.id=b.year_id ' +
      '   AND d.id=c.model_id ' +
      '   AND e.id=d.make_id ' +
      '   AND a.fleet_id=$1' +
      ' ORDER BY car_trim_id';

    return (await this.db.any<FleetCarLoanDto>(sqlStatement, [ fleetId, ]))
      .map((x) => DaoUtils.normalizeFields<FleetCarLoanDto>(x));
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