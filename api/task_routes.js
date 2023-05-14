import express from "express";
import poolPromise from "./sql_db.js";

const router = express.Router();

const querySelectAll =
  "SELECT * , DATE_FORMAT(dueDate,'%m/%d/%Y') AS dueDate from TODO";

// middleware that is specific to this router
router.use((req, res, next) => {
  next();
});

/* service / controller */

async function getAllData() {
  const results = await poolPromise.execute(querySelectAll);
  return results;
}

// define the home page route
router.get("/", async (req, res) => {
  try {
    const results = await getAllData();
    res.send(results);
  } catch (e) {
    res.status(404).send("db not working");
  }

  /* const [rows, fields] = await pool.execute("SELECT * from TODO");
  res.send(rows);*/
});

router.post("/edit", async (req, res) => {
  try {
    await poolPromise.execute("UPDATE TODO SET ? WHERE ?", [
      req.body,
      {
        id: req.body.id,
      },
    ]);
    res.send({ msg: "update db success" });
  } catch (e) {
    res.status(404).send("db not working");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    await poolPromise.execute("INSERT TODO SET ?", req.body);
    res.send({ msg: "update db success" });
  } catch (e) {
    res.status(404).send("db not working");
  }
});
router.post("/complete", async (req, res) => {
  try {
    await poolPromise.execute(
      "UPDATE TODO SET complete=not complete WHERE ?",
      req.body
    );
    console.log("success");
    res.send({ msg: "update db success" });
  } catch (e) {
    res.status(404).send({ error: "db not working" });
  }
});

router.put("/", (req, res) => {
  res.send("Received a PUT HTTP method");
});

router.delete("/", async (req, res) => {
  try {
    await poolPromise.execute("DELETE FROM TODO WHERE ?", req.body);
    const results = await getAllData();
    res.send(results);
  } catch (e) {
    res.status(404).send({ msg: "db not working" });
  }
});
export default router;
