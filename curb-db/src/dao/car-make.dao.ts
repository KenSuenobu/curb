import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { CarMakeDto } from '../dto';

export class CarMakeDao extends BaseDao<CarMakeDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, "curb.car_make");
  }

  async edit(id: number, payload: CarMakeDto): Promise<Boolean> {
    const sqlStatement =
      "UPDATE curb.car_make SET name=$1 WHERE id=$2";

    return this.db
      .none(sqlStatement, [
        payload.name,
        id,
      ])
      .then(() => true);
  }

  async create(payload: CarMakeDto): Promise<CarMakeDto> {
    const sqlStatement =
      "INSERT INTO curb.car_make (name) VALUES ($1) RETURNING *";

    return this.db.oneOrNone(sqlStatement, [ payload.name, ]);
  }
}