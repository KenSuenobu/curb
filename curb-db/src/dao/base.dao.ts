import * as pgPromise from 'pg-promise';
import {DaoUtils} from './dao-utils.dao';

export class BaseDao<T> {
  constructor(readonly db: pgPromise.IDatabase<any>, readonly section: string) { }

  async list(): Promise<T[]> {
    const selectStatement = `SELECT * FROM ${this.section}`;
    const returnResults: T[] = [];

    return (await this.db.any<T>(selectStatement))
      .map((x) => DaoUtils.normalizeFields<T>(x));
  }

  async getById(id: number): Promise<T> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE id=$1`;

    return this.db.oneOrNone<T>(selectStatement, [id])
      .then((x) => DaoUtils.normalizeFields<T>(x));
  }

  async getByName(name: string): Promise<T> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE name=$1 LIMIT 1`;

    return this.db.oneOrNone(selectStatement, [name])
      .then((x) => DaoUtils.normalizeFields<T>(x));
  }

  async deleteById(id: number): Promise<boolean> {
    const deleteStatement = `UPDATE ${this.section} SET enabled=false, delete_date=NOW() WHERE id=$1`;

    return this.db.none(deleteStatement, [id]).then(() => true);
  }

}