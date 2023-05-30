import * as pgPromise from 'pg-promise';

export class BaseDao<T> {
  constructor(readonly db: pgPromise.IDatabase<any>, readonly section: string) { }

  async list(): Promise<T[]> {
    const selectStatement = `SELECT * FROM ${this.section}`;

    return this.db.any<T>(selectStatement);
  }

  async getById(id: number): Promise<T> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE id=$1`;

    return this.db.oneOrNone<T>(selectStatement, [id]);
  }

  async getByName(name: string): Promise<T> {
    const selectStatement = `SELECT * FROM ${this.section} WHERE name=$1 LIMIT 1`;

    return this.db.oneOrNone<T>(selectStatement, [name]);
  }

  async deleteById(id: number): Promise<Boolean> {
    const deleteStatement = `UPDATE ${this.section} SET enabled=false, delete_date=NOW() WHERE id=$1`;

    return this.db.none(deleteStatement, [id]).then(() => true);
  }

}