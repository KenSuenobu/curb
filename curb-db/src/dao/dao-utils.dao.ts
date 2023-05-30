import * as pgPromise from 'pg-promise';

export class DaoUtils {
  private static readonly pgp = pgPromise({});
  private static readonly db = this.pgp(
    process.env.DATABASE_URL ?? 'postgres://localhost:5432/'
  );

  constructor() {}

  public static getDatabase() {
    return this.db;
  }
}