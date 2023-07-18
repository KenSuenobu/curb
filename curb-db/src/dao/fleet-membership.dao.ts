import {Logger} from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import {FleetCarDto, FleetCarLoanDto, FleetDto, FleetMembershipDto} from '../dto';
import {DaoUtils} from './dao-utils.dao';
import {BaseDao} from './base.dao';
import {FleetDao} from './fleet.dao';

export class FleetMembershipDao extends BaseDao<FleetMembershipDto> {
  private readonly logger = new Logger('fleet-membership.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.fleet_membership');
  }

  async edit(id: number, payload: FleetMembershipDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET user_id=$1, fleet_id=$2 WHERE id=$3`;

    return this.db
      .none(sqlStatement, [
        payload.userId,
        payload.fleetId,
        id,
      ])
      .then(() => true)
      .catch((x) => {
        this.logger.error('Unable to save FleetMembershipDto', x);
        return false;
      });
  }

  async create(payload: FleetMembershipDto): Promise<FleetMembershipDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (user_id, fleet_id) VALUES ($1, $2) RETURNING *`;

    return await this.db.oneOrNone(sqlStatement, [
      payload.userId,
      payload.fleetId,
    ])
      .then((x) => DaoUtils.normalizeFields<FleetMembershipDto>(x));
  }

  async getFleetsForUser(id: number): Promise<FleetDto[]> {
    const sqlStatement =
      `SELECT a.* FROM curb.fleet a, curb.fleet_membership b WHERE b.user_id = $1 AND a.id = b.fleet_id`;

    return (await this.db.manyOrNone(sqlStatement, [ id ]))
      .map((x) => DaoUtils.normalizeFields<FleetDto>(x));
  }

}