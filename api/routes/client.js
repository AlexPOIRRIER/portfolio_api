const express = require("express");
const router = express.Router();
const pool = require("../config");

//CREATION NEW CLIENT
router.post("/", (req, res) => {
  const data = req.body;
  pool.query("INSERT INTO client SET ?", data, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      const clientId = results.insertId;
      pool.query("SELECT * FROM client WHERE id = ?", clientId,
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

//GET ALL CLIENTS
router.get("/", (req, res) => {
  let sql = "SELECT * FROM client";
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
      res.status(404).send("Client doesn't exist")
    }
    else {
      res.status(200).json(results);
    }
  });
});

//GET ONE CLIENT
router.get("/:id", (req, res) => {
  const clientId = req.params.id;
  pool.query("SELECT * FROM client WHERE id = ? ", clientId, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).json(results);
    }
  });
});

//UPDATE ONE CLIENT
router.put("/:id", (req, res) => {
  const clientId = req.params.id;
  const data = req.body;
  pool.query(
    "UPDATE client SET ? WHERE id = ?",
    [data, clientId],
    (err, results) => {
      if (err) {
        res.sendStatus(err);
      } else {
        pool.query("SELECT * FROM client WHERE id = ?",
          clientId,
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

//DELETE ONE CLIENT
router.delete("/:id", (req, res) => {
  const clientId = req.params.id;
  pool.query(
    "DELETE FROM client WHERE id = ?",
    clientId,
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