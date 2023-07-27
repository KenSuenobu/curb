import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import {DeliveryAddressDto} from '../dto';

export class DeliveryAddressDao extends BaseDao<DeliveryAddressDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.delivery_address');
  }

  override async list(): Promise<DeliveryAddressDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY name ASC`;

    return this.db.any<DeliveryAddressDto>(selectStatement);
  }

  async edit(id: number, payload: DeliveryAddressDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET name=$1, data=$2 WHERE id=$3`;

    return this.db
      .none(sqlStatement, [
        payload.name,
        payload.data,
        id,
      ])
      .then(() => true);
  }

  async create(payload: DeliveryAddressDto): Promise<DeliveryAddressDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (name, data) VALUES ($1, $2) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [ payload.name, payload.data, ]);
  }
}