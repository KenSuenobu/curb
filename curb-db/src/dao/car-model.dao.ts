import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { CarModelDto } from '../dto';

export class CarModelDao extends BaseDao<CarModelDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.car_model');
  }

  override async list(): Promise<CarModelDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY name ASC`;

    return this.db.any<CarModelDto>(selectStatement);
  }

  async listByMakeId(makeId: number): Promise<CarModelDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE make_id=$1 ORDER BY name ASC`;

    return this.db.any<CarModelDto>(selectStatement, [ makeId, ]);
  }

  async edit(id: number, payload: CarModelDto): Promise<Boolean> {
    const sqlStatement =
      'UPDATE curb.car_model SET name=$1, make_id=$2 WHERE id=$3';

    return this.db
      .none(sqlStatement, [
        payload.name,
        payload.makeId,
        id,
      ])
      .then(() => true);
  }

  async create(payload: CarModelDto): Promise<CarModelDto> {
    const sqlStatement =
      'INSERT INTO curb.car_model (name, make_id) VALUES ($1, $2) RETURNING *';

    return this.db.oneOrNone(sqlStatement, [
      payload.name,
      payload.makeId,
    ]);
  }
}