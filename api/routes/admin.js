const express = require("express");
const router = express.Router();
const pool = require("../config");
const dotenv = require('dotenv');

dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const data = req.body;
  pool.query(
    "SELECT * FROM admin WHERE email = ?",
    [req.body.email],
    (err, results) => {
      if (err) {
        return res.sendStatus(err);
      }
      if (results.length > 0) {
        const goodPass = bcrypt.compareSync(req.body.password,
          results[0].password
        );
        if (goodPass) {
          jwt.sign({ results },
            process.env.SECRET_KEY_JWT,
            (error, token) => {
              if (error) {
                res.sendStatus(err)
              } else {
                res.status(200).json({
                  email: results[0].email,
                  token,
                })
              }
            }
          )
        } else res.sendStatus(500)
      } else res.status(404).send("Account doesn't exist")
    }
  )
})

//CREATE ADMIN ACCOUNT
router.post("/", (req, res) => {
  let data = req.body;
  if (req.body.password) {
    const hash = bcrypt.hashSync(req.body.password, 12);
    data = {
      ...req.body,
      password: hash,
    }
  }
  pool.query(
    "INSERT INTO admin SET ?",
    data,
    (err, results) => {
      if (err) {
        res.sendStatus(err);
      } else {
        res.sendStatus(201)
        // const adminId = results.insertId;
        // pool.query("SELECT * FROM admin WHERE id = ?", adminId,
        //   (error, records) => {
        //     if (error) {
        //       return res.sendStatus(error);
        //     }
        //     const insertedEntity = records[0];
        //     const host = req.get("localhost");
        //     const location = `https://${host}${req.url}/${insertedEntity.id}`;
        //     res.status(201).set("Location", location).json(insertedEntity);
        // }
        // )
      }
    })
})

//GET ALL ADMIN
router.get("/", (req, res) => {
  pool.query(
    "SELECT * FROM admin",
    (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json(results);
      }
    }
  )
})

//DELETE ONE ADMIN ACCOUNT
router.delete("/:id", (req, res) => {
  const adminId = req.params.id;
  pool.query(
    "DELETE FROM admin WHERE id = ?",
    adminId,
    (err, results) => {
      if (err) {
        res.sendStatus(err)
      } else {
        res.sendStatus(201)
      }
    }
  )
})

module.exports = router;