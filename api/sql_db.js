import { createRequire } from "module";

import { createPool, Pool } from "mysql2";

const require = createRequire(import.meta.url);

require("dotenv").config();

const mysql = require("mysql2/promise");

const mysql_easy = require("mysql2");

let connection;

export const init = async () => {
  connection = await mysql.createConnection({
    host: "reyflori.mysql.db.hostpoint.ch",
    user: "reyflori_ost",
    password: process.env.pw,
    port: 3306,
    database: "reyflori_OSTCAS",
  });
  console.log("connection");
  return connection;
};

export const connection2 = mysql_easy.createConnection({
  host: "reyflori.mysql.db.hostpoint.ch",
  user: "reyflori_ost",
  password: process.env.pw,
  port: 3306,
  database: "reyflori_OSTCAS",
});

connection2.connect();

export const execute2 = async (query, params, emptyAllowed) => {
  const [rows] = await connection.execute(query, params);
  if (rows.length === 0) {
    if (!emptyAllowed) throw new Error("no records found");
  }
  return rows;
};

export default connection;
