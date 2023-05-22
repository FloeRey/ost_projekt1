import { v4 as uuidv4 } from "uuid";
import poolPromise from "../sql_db.js";
import CommonRoutesConfig from "../common.routes.config.js";

export default class TaskRouter extends CommonRoutesConfig {
  constructor(app) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app.route(`/getUserData`).post(async (req, res) => {
      console.log("get user data", req.body);
      try {
        const response = await poolPromise.execute(
          "SELECT * from SETTINGS WHERE ? LIMIT 1",
          {
            user: req.body.userID,
          }
        );
        console.log(response);
        res.send(response);
      } catch (e) {
        res.status(404).send({ error: "db not working" });
      }
    });
    this.app.route(`/login`).post(async (req, res) => {
      try {
        const id = await poolPromise.execute(
          "SELECT uuid from USERS WHERE ? AND ? LIMIT 1",
          [{ name: req.body.name }, { pw: req.body.password }]
        );
        if (id.length === 0) {
          throw new Error("credentials not exists");
        }
        res.send({ msg: id[0] });
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    });
    this.app.route(`/createNewUser`).post(async (req, res) => {
      try {
        if (req.body.key !== process.env.key) {
          throw new Error("key wrong - sorry bro");
        }
        if (!req.body.name || !req.body.password)
          throw new Error("fill out name and password");
        const id = await poolPromise.execute(
          "SELECT * from USERS WHERE ? LIMIT 1",
          [{ name: req.body.name }]
        );
        if (id.length !== 0) {
          throw new Error("name already registered");
        }
        await poolPromise.execute("INSERT USERS SET ?", {
          name: req.body.name,
          pw: req.body.password,
          uuid: `${uuidv4()}`,
        });
        res.send({ msg: id[0] });
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    });
    return this.app;
  }
}
