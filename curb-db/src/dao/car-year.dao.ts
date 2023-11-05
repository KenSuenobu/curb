import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { CarYearDto } from '../dto';

export class CarYearDao extends BaseDao<CarYearDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.car_year');
  }

  override async list(): Promise<CarYearDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY year ASC`;

    return this.db.any<CarYearDto>(selectStatement);
  }

  async listByModelId(carModelId: number): Promise<CarYearDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE car_model_id=$1 ORDER BY year ASC`;

    return this.db.any<CarYearDto>(selectStatement, [ carModelId, ]);
  }

  async edit(id: number, payload: CarYearDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET year=$1, car_model_id=$2 WHERE id=$3`;

    return this.db
      .none(sqlStatement, [
        payload.year,
        payload.carModelId,
        id,
      ])
      .then(() => true);
  }

  async create(payload: CarYearDto): Promise<CarYearDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (creator_id, year, car_model_id) VALUES ($1, $2, $3) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.creatorId,
      payload.year,
      payload.carModelId,
    ]);
  }
}