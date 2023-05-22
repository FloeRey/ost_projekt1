import express from "express";
import path from "path";
import "dotenv/config";
import cors from "cors";
import { fileURLToPath } from "url";
import TaskRouter from "./api/routes/task_routes.js";
import UserRoutes from "./api/routes/user.routes.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const routes = [];

const app = express();
const port = 8080;

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/todo/api", express.static(path.join(dirname, "source", "public")));

app.use(cors());

const taskRouter = express.Router();
const userRoutes = express.Router();

app.use("/todo/api/user", userRoutes);
app.use("/todo/api/task", taskRouter);

routes.push(new TaskRouter(taskRouter));
routes.push(new UserRoutes(userRoutes));

/*
init()
  .then(() => startServer())
  .catch(() => "fail connection to db, check credentials");
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // eslint-disable-next-line no-console
  routes.forEach((route) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});
