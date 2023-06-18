import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { CarMakeDto, FleetDto } from '../dto';

export class FleetDao extends BaseDao<FleetDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.fleet');
  }

  override async list(): Promise<FleetDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY name ASC`;

    return this.db.any<FleetDto>(selectStatement);
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
      `INSERT INTO ${this.section} (name) VALUES ($1) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [ payload.name, ]);
  }
}