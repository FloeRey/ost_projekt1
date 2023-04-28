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
  // res.send("Received a GET HTTP method");
  mysql.query("SELECT * from TODO", (err, results) => {
    console.log(results);
    res.send(results);
  });
});

router.post("/", (req, res) => {
  mysql.query(
    "INSERT TODO  SET ?",
    {
      id: req.body.id,
      name: req.body.name,
      Description: req.body.Description,
      importance: req.body.importance,
    },
    (err) => {
      if (err) {
        res.status(404).send("db not working");
      } else {
        res.send("update db success");
      }
    }
  );
});

router.put("/", (req, res) => {
  res.send("Received a PUT HTTP method");
});

router.delete("/", (req, res) => {
  res.send("Received a DELETE HTTP method");
});
export default router;
