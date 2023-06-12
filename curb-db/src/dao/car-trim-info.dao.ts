import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import {CarTrimInfoDto} from '../dto';

export class CarTrimInfoDao extends BaseDao<CarTrimInfoDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.car_trim_info');
  }

  async getByTrimId(trimId: number): Promise<CarTrimInfoDto> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE trim_id=$1`;

    return this.db.oneOrNone<CarTrimInfoDto>(selectStatement, [ trimId, ]);
  }

  async edit(id: number, payload: CarTrimInfoDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET data=$1, trim_id=$2 WHERE id=$3`;

    return this.db
      .none(sqlStatement, [
        payload.data,
        payload['trim_id'],
        id,
      ])
      .then(() => true);
  }

  async create(payload: CarTrimInfoDto): Promise<CarTrimInfoDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (trim_id, data) VALUES ($1, $2) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.trimId,
      payload.data,
    ]);
  }
}