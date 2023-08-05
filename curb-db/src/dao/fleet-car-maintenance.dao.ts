import {BaseDao} from './base.dao';
import {FleetCarDto, FleetCarMaintenanceDto} from '../dto';
import {Logger} from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import {DaoUtils} from './dao-utils.dao';

export class FleetCarMaintenanceDao extends BaseDao<FleetCarMaintenanceDto> {
  private readonly logger = new Logger('fleet-car-maintenance.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.fleet_car_maintenance');
  }

  async create(payload: FleetCarMaintenanceDto): Promise<FleetCarMaintenanceDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (fleet_car_id, maintenance_time, maintenance_type, note, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    return await this.db.oneOrNone(sqlStatement, [
      payload.fleetCarId,
      payload.maintenanceTime,
      payload.maintenanceType,
      payload.note,
      payload.cost,
    ]).then((x) => DaoUtils.normalizeFields<FleetCarMaintenanceDto>(x));
  }

  async edit(payload: FleetCarMaintenanceDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET fleet_car_id=$1, maintenance_time=$2, maintenance_type=$3, note=$4, cost=$5 WHERE id=$6`;

    return await this.db.none(sqlStatement, [
      payload.fleetCarId,
      payload.maintenanceTime,
      payload.maintenanceType,
      payload.note,
      payload.cost,
      payload.id,
    ])
    .then((x) => true)
    .catch((x) => {
      this.logger.error(`Unable to edit: ${x}`, x);
      return false;
    });
  }

  async listForFleetCarId(fleetCarId: number): Promise<FleetCarMaintenanceDto[]> {
    const sqlStatement =
      `SELECT * FROM ${this.section} WHERE fleet_car_id=$1 ORDER BY maintenance_time DESC`;

    return (await this.db.any<FleetCarMaintenanceDto>(sqlStatement, [ fleetCarId, ]))
      .map((x) => DaoUtils.normalizeFields<FleetCarMaintenanceDto>(x));
  }

}