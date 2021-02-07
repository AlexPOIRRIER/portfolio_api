const express = require("express");
const router = express.Router();
const pool = require("../config");

//CREATE NEW MESSAGE
router.post("/", (req, res) => {
  const data = req.body;
  pool.query("INSERT INTO message SET ?", data, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      const messageId = results.insertId;
      pool.query("SELECT * FROM message WHERE id = ?", messageId,
        (error, records) => {
          if (error) {
            return res.sendStatus(error);
          }
          const insertedEntity = records[0];
          const host = req.get("localhost");
          const location = `https://${host}${req.url}/${insertedEntity.id}`;
          res.status(201).set("Location", location).json(insertedEntity);
        }
      )
    }
  }
  );
});

//GET ALL MESSAGE
router.get("/", (req, res) => {
  pool.query(
    "SELECT * FROM message",
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json(results);
      }
    });
});

//GET ONE MESSAGE
router.get("/:id", (req, res) => {
  const messageId = req.params.id;
  pool.query(
    "SELECT * FROM message WHERE id = ? ",
    messageId,
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).json(results);
      }
    });
});

//DELETE ONE MESSAGE
router.delete("/:id", (req, res) => {
  const messageId = req.params.id;
  pool.query(
    "DELETE FROM message WHERE id = ?",
    messageId,
    (err, results) => {
      if (err) {
        res.sendStatus(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;