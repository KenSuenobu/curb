import * as pgPromise from 'pg-promise';
import {DaoUtils} from '../dao/dao-utils.dao';
import {BaseDao} from './base.dao';
import {TripDto} from '../dto';

export class TripDao extends BaseDao<TripDto> {
  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.trip');
  }

  override async list(): Promise<TripDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} ORDER BY end_time DESC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listUpcoming(): Promise<TripDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE start_time >= NOW() ORDER BY end_time DESC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listPast(): Promise<TripDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE end_time <= NOW() ORDER BY end_time DESC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listCurrent(): Promise<TripDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE start_time <= NOW() AND end_time >= NOW() ORDER BY end_time DESC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listByFleetCarId(fleetCarId: number): Promise<TripDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE fleet_car_id=$1 ORDER BY end_time DESC`;

    return (await this.db.any(selectStatement, [ fleetCarId ]))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async getNextTripForFleetCarId(fleetCarId: number): Promise<TripDto | null> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE fleet_car_id=$1 AND start_time >= NOW() ORDER BY start_time ASC LIMIT 1`;

    return await this.db.oneOrNone(selectStatement, [ fleetCarId ])
      .then((x) => x ? DaoUtils.normalizeFields<TripDto>(x) : null);
  }

  async summationByFleetCarId(fleetCarId: number): Promise<number> {
    const selectStatement = `SELECT SUM(earnings) as total_earnings FROM ${this.section} WHERE fleet_car_id=$1`;

    return await this.db.oneOrNone(selectStatement, [ fleetCarId ])
      .then((x) => x ? x['total_earnings'] : 0.00);
  }

  async totalTripsForFleetCarId(fleetCarId: number): Promise<number> {
    const selectStatement = `SELECT COUNT(*) AS trip_total FROM ${this.section} WHERE fleet_car_id=$1`;

    return await this.db.oneOrNone(selectStatement, [ fleetCarId ])
      .then((x) => x ? x['trip_total'] : 0);
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

  async find(fleetCarId: number, tripDate: Date): Promise<TripDto> {
    const sqlStatement =
      `SELECT * FROM ${this.section} WHERE fleet_car_id=$1 AND (start_time <= $2 AND end_time >= $2)`;
    const result = (await this.db.oneOrNone(sqlStatement, [ fleetCarId, tripDate ]));

    if (result) {
      return DaoUtils.normalizeFields<TripDto>(result);
    }

    return null;
  }
}