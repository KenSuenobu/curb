import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import {CarMakeDto, TripDto} from '../dto';
import {DaoUtils} from './dao-utils.dao';

export class CarMakeDao extends BaseDao<CarMakeDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, "curb.car_make");
  }

  override async list(): Promise<CarMakeDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY name ASC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<CarMakeDto>(x));
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
      "INSERT INTO curb.car_make (creator_id, name) VALUES ($1, $2) RETURNING *";

    return this.db.oneOrNone(sqlStatement, [ payload.creatorId, payload.name, ]);
  }
}