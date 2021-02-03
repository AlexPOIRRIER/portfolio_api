const express = require('express');
const router = express.Router();

const client = require('./client');
const language = require('./language');
const project = require('./project')

router.use('/clients', client);
router.use('/languages', language);
router.use('/projects', project);

module.exports = router;