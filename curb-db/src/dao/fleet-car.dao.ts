import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { FleetCarDto } from 'src/dto/fleet-car.dto';
import { DaoUtils } from './dao-utils.dao';
import {Logger} from '@nestjs/common';

export class FleetCarDao extends BaseDao<FleetCarDto> {
  private readonly logger = new Logger('fleet-car.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.fleet_car');
  }

  async listByFleetId(fleetId: number): Promise<FleetCarDto[]> {
    const sqlStatement: string = 'SELECT a.*, b.name AS trim_name, c.year AS car_year, ' +
      'd.name AS model_name, e.name AS make_name ' +
      '  FROM curb.fleet_car a, curb.car_trim b, curb.car_year c, curb.car_model d, curb.car_make e' +
      ' WHERE b.id=a.car_trim_id ' +
      '   AND c.id=b.year_id ' +
      '   AND d.id=c.model_id ' +
      '   AND e.id=d.make_id ' +
      '   AND a.fleet_id=$1' +
      ' ORDER BY car_trim_id';

    return (await this.db.any<FleetCarDto>(sqlStatement, [ fleetId, ]))
      .map((x) => DaoUtils.normalizeFields<FleetCarDto>(x));
  }

  async edit(id: number, payload: FleetCarDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET fleet_id=$1, car_trim_id=$2, owner_id=$3, data=$4 WHERE id=$5`;

    return this.db
      .none(sqlStatement, [
        payload.fleetId,
        payload.carTrimId,
        payload.ownerId,
        payload.data,
        id,
      ])
      .then(() => true)
      .catch((x) => {
        this.logger.error('Unable to save FleetCarDto', x);
        return false;
      });
  }

  async create(payload: FleetCarDto): Promise<FleetCarDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (fleet_id, car_trim_id, owner_id, data) VALUES ($1, $2, $3, $4) RETURNING *`;

    return (await this.db.oneOrNone(sqlStatement, [
      payload.fleetId,
      payload.carTrimId,
      payload.ownerId,
      payload.data,
    ]))
      .then((x) => DaoUtils.normalizeFields<FleetCarDto>(x));
  }
}