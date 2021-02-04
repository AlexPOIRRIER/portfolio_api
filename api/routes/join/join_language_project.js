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

// GET ALL JLP DATA
router.get("/", (req, res) => {
  pool.query(
    "SELECT * FROM join_language_project",
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      }
      else {
        res.status(200).json(results);
      }
    });
});

// GET ALL LANGUAGES FOR SINGLE PROJECT
router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  pool.query(
    "SELECT l.id, l.name FROM language AS l JOIN join_language_project AS jlp ON l.id=jlp.id_language WHERE id_project= ?",
    projectId,
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
      }
      else {
        res.status(200).json(results);
      }
    });
});

router.delete(
  "/project/:idProject/", (req, res) => {
    const idProject = req.params.idProject;
    pool.query(
      'DELETE FROM join_language_project WHERE id_project = ?',
      idProject,
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
router.delete(
  "/:idProject/language/:idLanguage", (req, res) => {
    const idProject = req.params.idProject;
    const idLanguage = req.params.idLanguage;
    pool.query(
      'DELETE FROM join_language_project WHERE id_project = ? AND id_language = ?',
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