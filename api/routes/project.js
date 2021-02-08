const express = require("express");
const router = express.Router();
const pool = require("../config");

//CREATE NEW PROJECT
router.post("/", (req, res) => {
  const data = req.body;
  pool.query("INSERT INTO project SET ?", data, (err, results) => {
    if (err) {
      res.sendStatus(err);
    } else {
      const projectId = results.insertId;
      pool.query("SELECT * FROM project WHERE id = ?", projectId,
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

//GET ALL PROJECTS
router.get("/", (req, res) => {
  pool.query(
    "SELECT p.id AS project_id, p.name AS project_name, p.link AS project_link, p.duration AS project_duration, p.background, c.id AS client_id, c.name AS client_name FROM project AS p JOIN join_client_project AS jcp ON jcp.id_project=p.id JOIN client AS c ON c.id=jcp.id_client",
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json(results);
      }
    });
});

//GET ONE PROJECT
router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  pool.query(
    "SELECT * FROM project WHERE id = ? ",
    projectId,
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).json(results);
      }
    });
});

//UPDATE ONE PROJECT
router.put("/:id", (req, res) => {
  const projectId = req.params.id;
  const data = req.body;
  pool.query(
    "UPDATE project SET ? WHERE id = ?",
    [data, projectId],
    (err, results) => {
      if (err) {
        res.sendStatus(err);
      } else {
        pool.query("SELECT * FROM project WHERE id = ?",
          projectId,
          (error, records) => {
            if (error) {
              return res.sendStatus(error);
            }
            const insertedEntity = records[0];
            const host = req.get("localhost");
            const location = `https://${host}${req.url}/${insertedEntity.id}`;
            res.status(202).set("Location", location).json(insertedEntity);
          }
        )
      }
    }
  );
});

//DELETE ONE PROJECT
router.delete("/:id", (req, res) => {
  const projectId = req.params.id;
  pool.query(
    "DELETE FROM project WHERE id = ?",
    projectId,
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