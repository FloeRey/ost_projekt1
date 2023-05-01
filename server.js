import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import taskrouter from "./api/task_routes.js";

const require = createRequire(import.meta.url);

const cors = require("cors");

const app = express();
const port = 3000;

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use("/", express.static(path.join(dirname, "source", "public")));

app.use(cors());
app.use("/task", taskrouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
