import poolPromise from "../sql_db.js";
import CommonRoutesConfig from "../common.routes.config.js";

export default class TaskRouter extends CommonRoutesConfig {
  constructor(app) {
    super(app, "TaskRoutes");
    this.querySelectAll = "SELECT * from TODO";
  }

  get getAllAndUpdate() {
    return poolPromise.execute(this.querySelectAll);
  }

  configureRoutes() {
    this.app.route(`/getAllTasks`).get(async (req, res) => {
      console.log("getalltasks");
      try {
        const results = await this.getAllAndUpdate;
        //console.log(results);
        res.send(results);
      } catch (e) {
        console.log(e);
        res.status(404).send({ error: "db not working" });
      }
    });
    this.app.route(`/editTask`).get(async (req, res) => {
      try {
        await poolPromise.execute("UPDATE TODO SET ? WHERE ?", [
          req.body,
          {
            id: req.body.id,
          },
        ]);
        res.send({ msg: "update db success" });
      } catch (e) {
        res.status(404).send({ error: "db not working" });
      }
    });
    this.app.route(`/newTask`).post(async (req, res) => {
      try {
        await poolPromise.execute("INSERT TODO SET ?", req.body);
        res.send({ msg: "update db success" });
      } catch (e) {
        res.status(404).send({ error: "db not working" });
      }
    });
    this.app.route("/deleteTask").delete(async (req, res) => {
      try {
        await poolPromise.execute("DELETE FROM TODO WHERE ?", req.body);
        const results = await this.getAllAndUpdate;
        res.send(results);
      } catch (e) {
        res.status(404).send({ msg: "db not working" });
      }
    });

    return this.app;
  }
}
