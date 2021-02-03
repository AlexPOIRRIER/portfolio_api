const express = require('express');
const router = express.Router();

const client = require('./client');
const language = require('./language');
const project = require('./project')
const jcp = require('./join/join_client_project')
const jlp = require('./join/join_language_project')

router.use('/clients', client);
router.use('/languages', language);
router.use('/projects', project);
router.use('/jcp', jcp)
router.use('/jlp', jlp)

module.exports = router;