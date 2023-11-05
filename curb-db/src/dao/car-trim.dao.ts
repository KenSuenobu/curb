import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { CarTrimDto } from 'src/dto';

export class CarTrimDao extends BaseDao<CarTrimDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.car_trim');
  }

  override async list(): Promise<CarTrimDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY name ASC`;

    return this.db.any<CarTrimDto>(selectStatement);
  }

  async listByYearId(carYearId: number): Promise<CarTrimDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE car_year_id=$1 ORDER BY name ASC`;

    return this.db.any<CarTrimDto>(selectStatement, [ carYearId, ]);
  }

  async edit(id: number, payload: CarTrimDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET name=$1, car_year_id=$2 WHERE id=$3`;

    return this.db
      .none(sqlStatement, [
        payload.name,
        payload.carYearId,
        id,
      ])
      .then(() => true);
  }

  async create(payload: CarTrimDto): Promise<CarTrimDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (creator_id, name, car_year_id) VALUES ($1, $2, $3) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.creatorId,
      payload.name,
      payload.carYearId,
    ]);
  }
}