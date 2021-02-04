const express = require("express");
const router = express.Router();
const pool = require("../../config");

//CREATE JCP DATA
router.post('/', (req, res) => {
  const data = req.body;
  pool.query(
    'INSERT INTO join_client_project SET ?',
    data,
    (err, results) => {
      if (err) {
        res.sendStatus(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// GET ALL JCP DATA
router.get("/", (req, res) => {
  pool.query("SELECT * FROM join_client_project",
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      }
      else {
        res.status(200).json(results);
      }
    });
});

// DELETE JCP DATA
router.delete('/:idProject/client/:idClient', (req, res) => {
  const idProject = req.params.idProject;
  const idClient = req.params.idClient;
  pool.query(
    'DELETE FROM join_client_project WHERE id_project = ? AND id_client = ?',
    [idProject, idClient],
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