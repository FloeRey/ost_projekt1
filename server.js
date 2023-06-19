import express from "express";
import path from "path";
import "dotenv/config";
import { fileURLToPath } from "url";
import cors from "cors";

import TaskRouter from "./api/routes/task_routes.js";
import UserRoutes from "./api/routes/user.routes.js";

const routes = [];

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

const taskRouter = express.Router();
const userRoutes = express.Router();

app.use("/api/user", userRoutes);
app.use("/api/task", taskRouter);

routes.push(new TaskRouter(taskRouter));
routes.push(new UserRoutes(userRoutes));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // eslint-disable-next-line no-console
  routes.forEach((route) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});
