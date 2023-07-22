import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import {FleetCarLoanDto, UserDto} from 'src/dto';
import {DaoUtils} from './dao-utils.dao';

export class UserDao extends BaseDao<UserDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.user');
  }

  async edit(id: number, payload: UserDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET user_id=$1, email_address=$2, password=$3, verified=$4, data=$5 WHERE id=$6`;

    return this.db
      .none(sqlStatement, [
        payload.userId,
        payload.emailAddress,
        payload.password,
        payload.verified,
        payload.data,
        id,
      ])
      .then(() => true);
  }

  async create(payload: UserDto): Promise<UserDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (user_id, email_address, password, verified, data) VALUES ($1, $2, $3, $4) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.userId,
      payload.emailAddress,
      payload.password,
      payload.verified,
      payload.data,
    ]);
  }

  async login(emailAddress: string, password: string): Promise<string> {
    const sqlStatement = `SELECT user_id FROM ${this.section} WHERE email_address=$1 AND password=$2`;

    return this.db.oneOrNone(sqlStatement, [ emailAddress, password ])
      .then((x) => x.user_id)
      .catch((x) => 'error');
  }

  async getByEmail(emailAddress: string): Promise<UserDto | null> {
    const sqlStatement = `SELECT * FROM ${this.section} WHERE email_address=$1`;

    return this.db.oneOrNone(sqlStatement, [ emailAddress ])
      .then((x) => DaoUtils.normalizeFields<UserDto>(x))
      .catch((x) => null);
  }

  async getUserInfo(jwt: string): Promise<UserDto> {
    const sqlStatement = `SELECT * FROM ${this.section} WHERE user_id=$1`;

    return await this.db.oneOrNone(sqlStatement, [ jwt, ])
      .then((x) => DaoUtils.normalizeFields<UserDto>(x));
  }
}