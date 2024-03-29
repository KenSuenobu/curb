import * as pgPromise from 'pg-promise';
import {DaoUtils} from '../dao/dao-utils.dao';
import {BaseDao} from './base.dao';
import {TripDto} from '../dto';
import {Logger} from '@nestjs/common';

export class TripDao extends BaseDao<TripDto> {
  private readonly logger = new Logger('trip.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.trip');
  }

  override async list(): Promise<TripDto[]> {
    const selectStatement = `SELECT a.*, b.name AS location_name, c.data->'listingNickname' as nickname, d.first_name, d.last_name, d.data->>'url' AS url FROM ${this.section} a, curb.delivery_address b, curb.fleet_car c, curb.guest d WHERE b.id=a.delivery_address_id AND c.id=a.fleet_car_id AND d.id=a.guest_id ORDER BY a.start_time DESC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  override async deleteById(id: number): Promise<boolean> {
    const sqlStatement = `DELETE FROM ${this.section} WHERE id=$1`;

    return await this.db.none(sqlStatement, [ id ])
      .then((x) => true)
      .catch((x) => {
        this.logger.error(`Unable to delete by ID ${id}`, x);
        return false;
      });
  }

  async getTripByTripId(tripId: number): Promise<TripDto> {
    const selectStatement = `SELECT a.*, c.id AS fleet_id FROM ${this.section} a, curb.fleet_car b, curb.fleet c WHERE a.id=$1 AND b.id=a.fleet_car_id AND c.id=b.fleet_id`;

    return await this.db.oneOrNone(selectStatement, [tripId])
      .then((x) => x ? DaoUtils.normalizeFields<TripDto>(x) : null);
  }

  async listUpcoming(fleetId: number): Promise<TripDto[]> {
    const selectStatement = `SELECT a.*, b.name AS location_name, c.data->'listingNickname' as nickname, d.first_name, d.last_name, d.data->>'url' AS url FROM ${this.section} a, curb.delivery_address b, curb.fleet_car c, curb.guest d WHERE a.start_time >= NOW() AND b.id=a.delivery_address_id AND c.id=a.fleet_car_id AND c.fleet_id=${fleetId} AND d.id=a.guest_id ORDER BY a.start_time ASC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listPast(fleetId: number): Promise<TripDto[]> {
    const selectStatement = `SELECT a.*, b.name AS location_name, c.data->'listingNickname' as nickname, d.first_name, d.last_name, d.data->>'url' AS url FROM ${this.section} a, curb.delivery_address b, curb.fleet_car c, curb.guest d WHERE a.end_time <= NOW() AND b.id=a.delivery_address_id AND c.id=a.fleet_car_id AND c.fleet_id=${fleetId} AND d.id=a.guest_id ORDER BY a.start_time DESC`;

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listCurrent(fleetId: number): Promise<TripDto[]> {
    const selectStatement = `SELECT a.*, b.name AS location_name, c.data->'listingNickname' as nickname, d.first_name, d.last_name, d.data->>'url' AS url FROM ${this.section} a, curb.delivery_address b, curb.fleet_car c, curb.guest d WHERE (a.end_time >= NOW() AND a.start_time <= NOW()) AND b.id=a.delivery_address_id AND c.id=a.fleet_car_id AND d.id=a.guest_id AND c.fleet_id=${fleetId} ORDER BY a.start_time DESC`

    return (await this.db.any(selectStatement))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async getCurrentByFleetCarId(fleetCarId: number, year: string): Promise<TripDto> {
    const selectStatement = `SELECT a.*, b.name AS location_name, c.data->'listingNickname' as nickname, d.first_name, d.last_name, d.data->>'url' AS url ` +
      `  FROM ${this.section} a, curb.delivery_address b, curb.fleet_car c, curb.guest d ` +
      ` WHERE (a.end_time >= NOW() AND a.start_time <= NOW()) AND b.id=a.delivery_address_id ` +
      `   AND c.id=$1 AND a.fleet_car_id=$1 AND d.id=a.guest_id AND EXTRACT(YEAR FROM a.end_time)=$2 ` +
      `   AND EXTRACT(YEAR FROM a.start_time)=$2 ORDER BY a.start_time DESC`

    return await this.db.oneOrNone(selectStatement, [ fleetCarId, parseInt(year), ])
      .then((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listByFleetCarId(fleetCarId: number): Promise<TripDto[]> {
    const selectStatement = `select a.*, b.first_name, b.last_name, b.data->>'url' AS url from ${this.section} a, curb.guest b where a.fleet_car_id=$1 AND b.id=a.guest_id ORDER BY a.start_time DESC`;

    return (await this.db.any(selectStatement, [ fleetCarId ]))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async listByGuestId(guestId: number): Promise<TripDto[]> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE guest_id=$1 ORDER BY start_time DESC`;

    return (await this.db.any(selectStatement, [ guestId ]))
      .map((x) => DaoUtils.normalizeFields<TripDto>(x));
  }

  async getNextTripForFleetCarId(fleetCarId: number, year: string): Promise<TripDto | null> {
    const selectStatement = `SELECT a.*, b.first_name, b.last_name, b.data->>'url' AS url FROM ${this.section} a, curb.guest b WHERE a.fleet_car_id=$1 AND a.start_time >= NOW() AND EXTRACT(YEAR FROM a.end_time)=$2 AND EXTRACT(YEAR FROM a.start_time)=$2 AND b.id=a.guest_id ORDER BY a.start_time ASC LIMIT 1`;

    return await this.db.oneOrNone(selectStatement, [ fleetCarId, parseInt(year), ])
      .then((x) => x ? DaoUtils.normalizeFields<TripDto>(x) : null);
  }

  async summationByFleetCarId(fleetCarId: number, year: string): Promise<number> {
    const selectStatement = `SELECT SUM(earnings) as total_earnings FROM ${this.section} WHERE fleet_car_id=$1 AND EXTRACT(YEAR FROM end_time)=$2 AND EXTRACT(YEAR FROM start_time)=$2`;

    return await this.db.oneOrNone(selectStatement, [ fleetCarId, parseInt(year), ])
      .then((x) => x ? x['total_earnings'] : 0.00);
  }

  async totalMilesForFleetCarId(fleetCarId: number, year: string): Promise<number> {
    const sqlStatement = `SELECT SUM(mileage) AS total_mileage FROM ${this.section} WHERE fleet_car_id=$1 AND EXTRACT(YEAR FROM end_time)=$2 AND EXTRACT(YEAR FROM start_time)=$2`;

    return await this.db.oneOrNone(sqlStatement, [ fleetCarId, parseInt(year), ])
      .then((x) => x ? x['total_mileage'] : 0);
  }

  async totalEarningsPerMonth(): Promise<any[]> {
    const sqlStatement = `SELECT SUM(earnings) AS earnings_total, EXTRACT(MONTH FROM start_time) AS month FROM ${this.section} GROUP BY EXTRACT(MONTH FROM start_time) ORDER BY month`;

    return await this.db.many(sqlStatement);
  }

  async totalEarningsPerMonthByFleetCarId(fleetCarId: number, year: string): Promise<any[]> {
    const sqlStatement = `SELECT SUM(earnings) AS earnings_total, EXTRACT(MONTH FROM start_time) AS month FROM ${this.section} WHERE fleet_car_id=$1 AND EXTRACT(YEAR FROM end_time)=$2 AND EXTRACT(YEAR FROM start_time)=$2 GROUP BY EXTRACT(MONTH FROM start_time) ORDER BY month`;

    return await this.db.manyOrNone(sqlStatement, [ fleetCarId, parseInt(year), ]);
  }

  async totalTripsPerMonth(): Promise<any[]> {
    const sqlStatement = `SELECT COUNT(*) AS total_trips, EXTRACT(MONTH FROM start_time) AS month FROM ${this.section} GROUP BY EXTRACT(MONTH FROM start_time) ORDER BY month`;

    return await this.db.manyOrNone(sqlStatement);
  }

  async totalTripsPerMonthByFleetCarId(fleetCarId: number, year: string): Promise<any[]> {
    const sqlStatement = `SELECT COUNT(*) AS total_trips, EXTRACT(MONTH FROM start_time) AS month FROM ${this.section} WHERE fleet_car_id=$1 AND EXTRACT(YEAR FROM end_time)=$2 AND EXTRACT(YEAR FROM start_time)=$2 GROUP BY EXTRACT(MONTH FROM start_time) ORDER BY month`;

    return await this.db.manyOrNone(sqlStatement, [ fleetCarId, parseInt(year), ]);
  }

  async totalTripsForFleetCarId(fleetCarId: number, year: string): Promise<number> {
    const selectStatement = `SELECT COUNT(*) AS trip_total FROM ${this.section} WHERE fleet_car_id=$1 AND EXTRACT(YEAR FROM end_time)=$2 AND EXTRACT(YEAR FROM start_time)=$2`;

    return await this.db.oneOrNone(selectStatement, [ fleetCarId, parseInt(year), ])
      .then((x) => x ? x['trip_total'] : 0);
  }

  async edit(id: number, payload: TripDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET id=$1, fleet_car_id=$2, guest_id=$3, delivery_address_id=$4, trip_id=$5, start_time=$6, end_time=$7, mileage=$8, earnings=$9, airline_iana=$10, flight_number=$11, arrival=$12 WHERE id=$13`;

    return this.db
      .none(sqlStatement, [
        payload.id,
        payload.fleetCarId,
        payload.guestId,
        payload.deliveryAddressId,
        payload.tripId,
        payload.startTime,
        payload.endTime,
        payload.mileage,
        payload.earnings,
        payload.airlineIana,
        payload.flightNumber,
        payload.arrival,
        id,
      ])
      .then(() => true);
  }

  async create(payload: TripDto): Promise<TripDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (fleet_car_id, guest_id, delivery_address_id, trip_id, start_time, end_time, mileage, earnings, airline_iana, flight_number, arrival) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

    return this.db.oneOrNone(sqlStatement, [
      payload.fleetCarId,
      payload.guestId,
      payload.deliveryAddressId,
      payload.tripId,
      payload.startTime,
      payload.endTime,
      payload.mileage,
      payload.earnings,
      payload.airlineIana,
      payload.flightNumber,
      payload.arrival,
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