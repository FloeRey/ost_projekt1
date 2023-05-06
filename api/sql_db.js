import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

const mysql = require("mysql2/promise");

const connection = await mysql.createConnection({
  host: "reyflori.mysql.db.hostpoint.ch",
  user: "reyflori_ost",
  database: "reyflori_OSTCAS",
  password: process.env.pw,
  namedPlaceholders: true,
});

export default connection;

/*
// create the connection to database
const connection = mysql.createConnection({
  host: "reyflori.mysql.db.hostpoint.ch",
  user: "reyflori_ost",
  password: process.env.pw,
  port: 3306,
  database: "reyflori_OSTCAS",
});

connection.connect();

export default connection;*/
