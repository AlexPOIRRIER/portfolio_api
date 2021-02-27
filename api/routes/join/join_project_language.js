const express = require("express");
const router = express.Router();
const pool = require("../../config");

//CREATE JLP DATA
router.post('/', (req, res) => {
  const data = req.body;
  pool.query(
    'INSERT INTO join_project_language SET ?',
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
    "SELECT * FROM join_project_language",
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
    "SELECT l.id, l.name FROM language AS l JOIN join_project_language AS jlp ON l.id=jlp.language_id WHERE project_id= ?",
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

// DELETE JPL BY LANGUAGE
router.delete(
  "/language/:idLanguage/", (req, res) => {
    const idLanguage = req.params.idLanguage;
    pool.query(
      'DELETE FROM join_project_language WHERE language_id = ?',
      idLanguage,
      (err, results) => {
        if (err) {
          res.sendStatus(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });


// DELETE JPL BY PROJECT
router.delete(
  "/project/:idProject/", (req, res) => {
    const idProject = req.params.idProject;
    pool.query(
      'DELETE FROM join_project_language WHERE project_id = ?',
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
      'DELETE FROM join_project_language WHERE project_id = ? AND language_id = ?',
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