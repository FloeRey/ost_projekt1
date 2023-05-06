/*
import { createRequire } from "module";
const require = createRequire(import.meta.url);
*/

import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "reyflori.mysql.db.hostpoint.ch",
  user: "reyflori_ost",
  database: "reyflori_OSTCAS",
  password: process.env.pw,
  namedPlaceholders: true,
});

export default connection;
