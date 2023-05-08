import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "reyflori.mysql.db.hostpoint.ch",
  user: "reyflori_ost",
  database: "reyflori_OSTCAS",
  password: process.env.pw,
  namedPlaceholders: true,
  connectionLimit: 10,
});

export default pool;
