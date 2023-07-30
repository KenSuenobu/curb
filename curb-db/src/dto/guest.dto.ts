import * as pgPromise from 'pg-promise';
import { GuestDto } from 'src/dao';
import {BaseDao} from '../dao/base.dao';
import {DaoUtils} from '../dao/dao-utils.dao';

export enum SearchType {
  LastName,
  GuestId,
  Data
};

export class GuestDao extends BaseDao<GuestDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.guest');
  }

  override async list(blacklisted: boolean = false): Promise<GuestDto[]> {
    const selectStatement = `SELECT id, guest_id, guest_id_source, blacklisted, first_name, middle_name, last_name ` +
      `FROM ${this.section} WHERE blacklisted=$1 ORDER BY last_name ASC`;

    return (await this.db.any(selectStatement, [ blacklisted ]))
      .map((x) => DaoUtils.normalizeFields<GuestDto>(x));
  }

  async listAll(): Promise<GuestDto[]> {
    const selectStatement = `SELECT id, guest_id, guest_id_source, blacklisted, first_name, middle_name, last_name ` +
      `FROM ${this.section} ORDER BY last_name ASC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<GuestDto>(x));
  }

  async edit(id: number, payload: GuestDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET guest_id=$1, guest_id_source=$2, blacklisted=$3, first_name=$4, middle_name=$5, last_name=$6, data=$7 WHERE id=$8`;

    return this.db
      .none(sqlStatement, [
        payload.guestId,
        payload.guestIdSource,
        payload.blacklisted,
        payload.firstName,
        payload.middleName,
        payload.lastName,
        payload.data,
        id,
      ])
      .then(() => true);
  }

  async find(searchType: SearchType, key?: string, value?: string): Promise<GuestDto[] | GuestDto> {
    if (searchType === SearchType.LastName) {
      const sqlStatement =
        `SELECT * FROM ${this.section} WHERE last_name LIKE $1`;

      return this.db.any<GuestDto>(sqlStatement, [ value ]);
    }

    if (searchType === SearchType.GuestId) {
      const sqlStatement =
        `SELECT * FROM ${this.section} WHERE guest_id=$1`;

      return this.db.oneOrNone<GuestDto>(sqlStatement, [ value ]);
    }
  }

  async create(payload: GuestDto): Promise<GuestDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (guest_id, guest_id_source, blacklisted, first_name, middle_name, last_name, data) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.guestId,
      payload.guestIdSource,
      payload.blacklisted,
      payload.firstName,
      payload.middleName,
      payload.lastName,
      payload.data,
    ]);
  }
}