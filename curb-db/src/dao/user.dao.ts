import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { UserDto } from 'src/dto';

export class UserDao extends BaseDao<UserDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.user');
  }

  async edit(id: number, payload: UserDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET user_id=$1, username=$2, password=$3, email_address=$4 WHERE id=$5`;

    return this.db
      .none(sqlStatement, [
        payload.userId,
        payload.username,
        payload.password,
        payload.emailAddress,
        id,
      ])
      .then(() => true);
  }

  async create(payload: UserDto): Promise<UserDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (user_id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.userId,
      payload.username,
      payload.password,
      payload.emailAddress,
    ]);
  }

  async login(username: string, password: string): Promise<string> {
    const sqlStatement = `SELECT user_id FROM ${this.section} WHERE username=$1 AND password=$2`;

    return this.db.oneOrNone(sqlStatement, [ username, password ])
      .then((x) => x.user_id)
      .catch((x) => 'error');
  }
}