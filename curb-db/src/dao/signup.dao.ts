import { BaseDao } from './base.dao';
import * as pgPromise from 'pg-promise';
import { FleetCarDto } from 'src/dto/fleet-car.dto';
import { DaoUtils } from './dao-utils.dao';
import {Logger} from '@nestjs/common';
import {SignupDto} from '../dto/signup.dto';

export class SignupDao extends BaseDao<SignupDto> {
  private readonly logger = new Logger('signup.service');

  constructor(readonly db: pgPromise.IDatabase<any>) {
    super(db, 'curb.signup');
  }

  async create(payload: SignupDto): Promise<SignupDto> {
    const sqlStatement =
      `INSERT INTO ${this.section} (email_address, ip_address, source, note) VALUES ($1, $2, $3, $4) RETURNING *`;

    return await this.db.oneOrNone(sqlStatement, [
      payload.emailAddress,
      payload.ipAddress,
      payload.source,
      payload.note,
    ])
    .then((x) => DaoUtils.normalizeFields<SignupDto>(x));
  }
}