import poolPromise from "../sql_db.js";
import CommonRoutesConfig from "../common.routes.config.js";

export default class TaskRouter extends CommonRoutesConfig {
  constructor(app) {
    super(app, "TaskRoutes");
    this.querySelectAll =
      // "SELECT *,  DATE_FORMAT(dueDate,'%m-%d-%Y') AS dueDate from TODO WHERE creator_id= ? ";
      "SELECT *,  DATE_FORMAT(dueDate,'%Y-%m-%d') AS dueDate from TODO WHERE creator_id= ? ";
  }

  getAllAndUpdate(auth) {
    return poolPromise.execute(this.querySelectAll, auth);
  }

  configureRoutes() {
    this.app.route(`/getAllTasks`).get(async (req, res) => {
      const authenticationId = req.header("Authorization");
      try {
        if (!authenticationId) throw new Error("you are wrong here");
        const results = await this.getAllAndUpdate(authenticationId);
        res.send(results);
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    });

    this.app.route(`/complete`).post(async (req, res) => {
      const authenticationId = req.header("Authorization");
      try {
        if (!authenticationId) throw new Error("you are wrong here");
        await poolPromise.execute(
          "UPDATE TODO SET complete=not complete WHERE ?",
          req.body
        );

        res.send({ msg: "update db success" });
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    });

    this.app.route(`/editTask`).post(async (req, res) => {
      const authenticationId = req.header("Authorization");
      try {
        if (!authenticationId) throw new Error("you are wrong here");
        await poolPromise.execute("UPDATE TODO SET ? WHERE ? AND ?", [
          req.body,
          {
            id: req.body.id,
          },
          {
            creator_id: authenticationId,
          },
        ]);
        res.send({ msg: "update db success" });
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    });
    this.app.route(`/newTask`).post(async (req, res) => {
      const authenticationId = req.header("Authorization");
      const obj = {
        creator_id: authenticationId,
      };
      try {
        if (!authenticationId) throw new Error("you are wrong here");
        await poolPromise.execute(
          "INSERT TODO SET ?",
          Object.assign(req.body, obj)
        );
        res.send({ msg: "update db success" });
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    });
    this.app.route("/deleteTask").delete(async (req, res) => {
      const authenticationId = req.header("Authorization");

      const obj = {
        creator_id: authenticationId,
      };
      try {
        if (!authenticationId) throw new Error("you are wrong here");
        await poolPromise.execute("DELETE FROM TODO WHERE ? AND ?", [
          req.body,
          obj,
        ]);
        const results = await this.getAllAndUpdate(authenticationId);
        res.send(results);
      } catch (error) {
        res.status(404).send({ error: error.message });
      }
    });

    return this.app;
  }
}
