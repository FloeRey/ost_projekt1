import { createPool } from "mysql2";

class PoolPromise {
  constructor() {
    this.pool = createPool({
      host: "reyflori.mysql.db.hostpoint.ch",
      user: "reyflori_ost",
      database: "reyflori_OSTCAS",
      password: process.env.pw,
      connectionLimit: 10,
    });
    this.poolPromise = this.pool.promise();
  }

  async execute(query, params) {
    if (!this.poolPromise)
      throw new Error(
        "Pool was not created. Ensure pool is created when running the app."
      );
    const [rows] = await this.poolPromise.query(query, params);
    if (query.search("LIMIT 1") !== -1 && rows.length === 1) {
      return rows[0];
    }
    return rows;
  }
}

export default new PoolPromise();
