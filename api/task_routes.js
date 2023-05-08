import express from "express";
import pool from "./sql_pool.js";
import poolPromise from "./sql_db.js";

const router = express.Router();

const querySelectAll = "SELECT * from TODO";

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
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
    console.log("update id:", req.body);
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
  console.log("post");
  /*try {
    await pool.execute("INSERT INTO TODO (title) VALUES (:title)", {
      title: req.body.title,
    });
    res.send("update db success");
  } catch (e) {
    res.status(404).send("db not working");
  }*/
  console.log(req.body);
  try {
    await poolPromise.execute("INSERT TODO SET ?", req.body);
    res.send({ msg: "update db success" });
  } catch (e) {
    res.status(404).send("db not working");
  }
});

router.put("/", (req, res) => {
  res.send("Received a PUT HTTP method");
});

router.delete("/", async (req, res) => {
  console.log(req.body);
  try {
    await poolPromise.execute("DELETE FROM TODO WHERE ?", req.body);
    const results = await getAllData();
    res.send(results);
  } catch (e) {
    res.status(404).send({ msg: "db not working" });
  }
});
export default router;
