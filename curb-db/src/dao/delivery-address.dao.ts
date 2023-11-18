import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import {DeliveryAddressDto} from '../dto';
import {DaoUtils} from './dao-utils.dao';

export class DeliveryAddressDao extends BaseDao<DeliveryAddressDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.delivery_address');
  }

  async listForFleetId(fleetId: number): Promise<DeliveryAddressDto[]> {
    const selectStatement = `SELECT id, creator_id, fleet_id, public, name, data->>'category' AS category FROM ${this.section} WHERE fleet_id=$1 OR public IS TRUE ORDER BY name ASC`;

    return (await this.db.any(selectStatement, [ fleetId ]))
      .map((x) => DaoUtils.normalizeFields<DeliveryAddressDto>(x));
  }

  async edit(id: number, payload: DeliveryAddressDto): Promise<Boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET name=$1, fleet_id=$2, data=$3, public=$4 WHERE id=$5`;

    return this.db
      .none(sqlStatement, [
        payload.name,
        payload.fleetId,
        payload.data,
        payload.public,
        id,
      ])
      .then(() => true);
  }

  async create(payload: DeliveryAddressDto): Promise<DeliveryAddressDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (name, creator_id, fleet_id, data, public) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [ payload.name, payload.creatorId, payload.fleetId, payload.data, payload.public ]);
  }
}