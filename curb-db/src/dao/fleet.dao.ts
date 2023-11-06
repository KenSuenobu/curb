import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { FleetDto } from '../dto';
import {DaoUtils} from './dao-utils.dao';

export class FleetDao extends BaseDao<FleetDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.fleet');
  }

  async listByCreatorId(creatorId: number): Promise<FleetDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE creator_id=$1 ORDER BY name ASC`;

    return (await this.db.any(selectStatement, [ creatorId ]))
      .map((x) => DaoUtils.normalizeFields<FleetDto>(x));
  }

  async edit(id: number, payload: FleetDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET name=$1 WHERE id=$2`;

    return this.db
      .none(sqlStatement, [
        payload.name,
        id,
      ])
      .then(() => true);
  }

  async create(payload: FleetDto): Promise<FleetDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (creator_id, name) VALUES ($1, $2) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.creatorId,
      payload.name,
    ]);
  }
}