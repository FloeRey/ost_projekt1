import { v4 as uuidv4 } from "uuid";
import poolPromise from "../sql_db.js";
import CommonRoutesConfig from "../common.routes.config.js";
import settings from "../env.js/settings.js";
import { send, sendError } from "./commmon/createSendResponse.js";
import UserController from "./controller/user.controller.js";

export default class TaskRouter extends CommonRoutesConfig {
  constructor(app) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app.route(`/getGuestId`).get((req, res) => {
      res.send(send(settings.guestId));
    });

    this.app.route(`/login`).post(UserController.loginUser);

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
        res.send(send(id[0]));
      } catch (error) {
        res.status(404).send(sendError(error.message));
      }
    });
    return this.app;
  }
}
