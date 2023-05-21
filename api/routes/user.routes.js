import poolPromise from "../sql_db.js";
import CommonRoutesConfig from "../common.routes..config.js";

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
    return this.app;
  }
}
