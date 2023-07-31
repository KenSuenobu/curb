import {BaseDao} from './base.dao';
import {LoanPaymentDto, TollDto} from '../dto';
import {Logger} from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import {DaoUtils} from './dao-utils.dao';

export class TollDao extends BaseDao<TollDto> {
  private readonly logger = new Logger('toll.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.toll');
  }

  async create(payload: TollDto): Promise<TollDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (trip_id, toll_time, toll_location, toll_amount) VALUES ($1, $2, $3, $4) RETURNING *`;

    return (await this.db.oneOrNone(sqlStatement, [
      payload.tripId,
      payload.tollTime,
      payload.tollLocation,
      payload.tollAmount,
    ]))
    .then((x) => DaoUtils.normalizeFields<TollDto>(x));
  }

  async edit(id: number, payload: TollDto): Promise<boolean> {
    const sqlStatement =
      `UPDATE ${this.section} SET trip_id=$1, toll_time=$2, toll_location=$3, toll_amount=$4 WHERE id=$5`;

    return (await this.db.oneOrNone(sqlStatement, [
      payload.tripId,
      payload.tollTime,
      payload.tollLocation,
      payload.tollAmount,
      id,
    ]))
    .then((x) => true)
    .catch((x) => {
      this.logger.error('Unable to edit toll', x);
      return false;
    });
  }

  async list(): Promise<TollDto[]> {
    const sqlStatement = `SELECT * FROM ${this.section} ORDER BY toll_time DESC`;

    return (await this.db.any(sqlStatement))
      .map((x) => DaoUtils.normalizeFields<TollDto>(x));
  }

  async listByTripId(tripId: number): Promise<TollDto[]> {
    const sqlStatement = `SELECT * FROM ${this.section} WHERE trip_id=$1 ORDER BY toll_time DESC`;

    return (await this.db.any(sqlStatement, [ tripId, ]))
      .map((x) => DaoUtils.normalizeFields<TollDto>(x));
  }

}