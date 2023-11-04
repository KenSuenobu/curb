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

  async listByMakeId(carMakeId: number): Promise<CarModelDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE car_make_id=$1 ORDER BY name ASC`;

    return this.db.any<CarModelDto>(selectStatement, [ carMakeId, ]);
  }

  async edit(id: number, payload: CarModelDto): Promise<Boolean> {
    const sqlStatement =
      'UPDATE curb.car_model SET name=$1, car_make_id=$2 WHERE id=$3';

    return this.db
      .none(sqlStatement, [
        payload.name,
        payload.carMakeId,
        id,
      ])
      .then(() => true);
  }

  async create(payload: CarModelDto): Promise<CarModelDto> {
    const sqlStatement =
      'INSERT INTO curb.car_model (creator_id, name, car_make_id) VALUES ($1, $2, $3) RETURNING *';

    return this.db.oneOrNone(sqlStatement, [
      payload.creatorId,
      payload.name,
      payload.carMakeId,
    ]);
  }
}