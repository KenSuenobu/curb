import * as pgPromise from 'pg-promise';
import {DaoUtils} from '../dao/dao-utils.dao';
import {BaseDao} from './base.dao';
import {TripDto} from '../dto';

export class TripDao extends BaseDao<TripDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.trip');
  }

  override async list(): Promise<TripDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY end_time ASC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async edit(id: number, payload: TripDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET id=$1, fleet_car_id=$2, guest_id=$3, delivery_address_id=$4, trip_id=$5, trip_url=$6, start_time=$7, end_time=$8, mileage=$9, earnings=$10 WHERE id=$11`;

    return this.db
      .none(sqlStatement, [
        payload.id,
        payload.fleetCarId,
        payload.guestId,
        payload.deliveryAddressId,
        payload.tripId,
        payload.tripUrl,
        payload.startTime,
        payload.endTime,
        payload.mileage,
        payload.earnings,
        id,
      ])
      .then(() => true);
  }

  async create(payload: TripDto): Promise<TripDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (fleet_car_id, guest_id, delivery_address_id, trip_id, trip_url, start_time, end_time, mileage, earnings) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.fleetCarId,
      payload.guestId,
      payload.deliveryAddressId,
      payload.tripId,
      payload.tripUrl,
      payload.startTime,
      payload.endTime,
      payload.mileage,
      payload.earnings,
    ]);
  }
}