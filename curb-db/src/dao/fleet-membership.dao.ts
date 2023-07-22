import {Logger} from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import {FleetCarDto, FleetCarLoanDto, FleetDto, FleetMembershipDto, UserDto} from '../dto';
import {DaoUtils} from './dao-utils.dao';
import {BaseDao} from './base.dao';
import {FleetDao} from './fleet.dao';
import {UserDao} from './user.dao';

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

  async getUsersForFleet(id: number): Promise<string[]> {
    const sqlStatement =
      `SELECT a.email_address FROM curb.user a, curb.fleet_membership b where b.fleet_id = $1 AND a.id = b.user_id`;

    return (await this.db.manyOrNone(sqlStatement, [ id ]))
      .map((x) => x.email_address);
  }

  async addEmailToFleet(fleetId: number, email: string): Promise<boolean> {
    const userDao = new UserDao(this.db);
    const userInfo = await userDao.getByEmail(email);

    if (email && userInfo) {
      const payload: FleetMembershipDto = {
        userId: userInfo.id,
        fleetId,
      };

      return await this.create(payload)
        .then((x) => true)
        .catch((x) => false);
    }

    return false;
  }

}