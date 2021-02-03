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

// DELETE JCP DATA
router.delete('/:idProject/client/:idClient', (req, res) => {
  const idProject = req.params.idProject;
  const idClient = req.params.idClient;
  connection.query(
    'DELETE FROM join_client_project WHERE project_id = ? AND client_id = ?',
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