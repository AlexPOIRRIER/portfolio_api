const express = require("express");
const router = express.Router();
const pool = require("../config");

router.post("/", (req, res) => {
  const data = req.body;
  pool.query("INSERT INTO language SET ?", data, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      const languageId = results.insertId;
      pool.query("SELECT * FROM language WHERE id = ?", languageId,
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

router.get("/", (req, res) => {
  let sql = "SELECT * FROM language";
  const sqlValues = [];
  if (req.query.genre) {
    sql += " WHERE name LIKE ?";
    const filter = `%${req.query.genre}%`;
    sqlValues.push(filter);
  }
  pool.query(sql, sqlValues, (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data");
    }
    if (results.length === 0) {
      res.status(404).send("Language doesn't exist")
    }
    else {
      res.status(200).json(results);
    }
  });
});


module.exports = router;