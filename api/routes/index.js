const express = require('express');
const router = express.Router();

const client = require('./client');
const language = require('./language');
const project = require('./project')
const message = require('./message')
const admin = require('./admin')
const jpc = require('./join/join_project_client')
const jpl = require('./join/join_project_language')

router.use('/clients', client);
router.use('/languages', language);
router.use('/projects', project);
router.use('/messages', message);
router.use('/admins', admin)
router.use('/jpc', jpc);
router.use('/jpl', jpl);

module.exports = router;