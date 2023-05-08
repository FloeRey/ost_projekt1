import express from "express";
import { execute2 } from "./sql_db.js";

import { connection2 } from "./sql_db.js";

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// define the home page route
router.get("/", async (req, res) => {
  const response = await execute2(`SELECT * from TODO`, null, true);

  res.send(response);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const response = await execute2(
    "INSERT TODO  SET ?",
    {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      importance: req.body.importance,
    },
    true
  );

  console.log(response);
  /*
  connection2.query(
    "INSERT TODO  SET ?",
    {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      importance: req.body.importance,
    },
    (err) => {
      console.log(err);
      if (err) {
        res.status(404).send("db not working");
      } else {
        res.send({ msg: "update db success" });
      }
    }
  );*/
});

router.put("/", (req, res) => {
  res.send("Received a PUT HTTP method");
});

router.delete("/", (req, res) => {
  res.send("Received a DELETE HTTP method");
});
export default router;
