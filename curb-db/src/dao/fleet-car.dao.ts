import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { FleetCarDto } from 'src/dto/fleet-car.dto';

export class FleetCarDao extends BaseDao<FleetCarDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.fleet_car');
  }

  async listByFleetId(fleetId: number): Promise<FleetCarDto[]> {
    const sqlStatement = `SELECT * FROM ${this.section} WHERE fleet_id=$1`;

    return this.db.any<FleetCarDto>(sqlStatement, [ fleetId, ]);
  }

  async edit(id: number, payload: FleetCarDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET fleet_id=$1, car_trim_id=$2, data=$3 WHERE id=$4`;

    return this.db
      .none(sqlStatement, [
        payload.fleetId,
        payload.carTrimId,
        payload.data,
        id,
      ])
      .then(() => true);
  }

  async create(payload: FleetCarDto): Promise<FleetCarDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (fleet_id, car_trim_id, data) VALUES ($1, $2, $3) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [ payload.fleetId, payload.carTrimId, payload.data, ]);
  }
}