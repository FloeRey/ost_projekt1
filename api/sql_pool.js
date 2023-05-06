import { createRequire } from "module";

const require = createRequire(import.meta.url);

const mysql = require("mysql2/promise");

export default async function init() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
  });
  return connection;
}
