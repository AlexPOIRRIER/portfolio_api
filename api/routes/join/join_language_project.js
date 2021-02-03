const express = require("express");
const router = express.Router();
const pool = require("../../config");

//CREATE JLP DATA
router.post('/', (req, res) => {
  const data = req.body;
  pool.query(
    'INSERT INTO join_language_project SET ?',
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

// DELETE JLP DATA
router.delete('/:idProject/client/:idLanguage', (req, res) => {
  const idProject = req.params.idProject;
  const idLanguage = req.params.idLanguage;
  connection.query(
    'DELETE FROM join_language_project WHERE project_id = ? AND language_id = ?',
    [idProject, idLanguage],
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