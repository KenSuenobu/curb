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

  static toCamelCase = (s) => s.replace(/_(.)/g, (s, c) => c.toUpperCase());

  public static normalizeFields<T>(data: any | undefined | null): T {
    const returnObject: any = {};

    if (!data) {
      return data;
    }

    for(const key of Object.keys(data)) {
      const newKey = DaoUtils.toCamelCase(key);

      returnObject[newKey] = data[key];
    }

    return returnObject as T;
  }
}