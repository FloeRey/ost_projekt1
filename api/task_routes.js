import express from "express";
import mysql from "./sql_db.js";

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.get("/", async (req, res) => {
  console.log("get");
  const [rows, fields] = await mysql.execute("SELECT * from TODO");
  res.send(rows);
});
router.post("/", async (req, res) => {
  try {
    await mysql.execute("INSERT INTO TODO (title) VALUES (:title)", {
      title: req.body.title,
    });
    res.send("update db success");
  } catch (e) {
    res.status(404).send("db not working");
  }
});

router.put("/", (req, res) => {
  res.send("Received a PUT HTTP method");
});

router.delete("/", (req, res) => {
  res.send("Received a DELETE HTTP method");
});
export default router;
