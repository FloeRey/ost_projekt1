import express from "express";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";
import cors from "cors";

import taskrouter from "./api/task_routes.js";

const app = express();
const port = 3000;

function startServer() {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
  });
}

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use("/", express.static(path.join(dirname, "source", "public")));

app.use(cors());
app.use("/task", taskrouter);
/*
init()
  .then(() => startServer())
  .catch(() => "fail connection to db, check credentials");
*/

app.listen(port, () => {
  // eslint-disable-next-line no-console
});
