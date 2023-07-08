const express = require('express');
const {
    getAllWorkSessions,
    getWorkSession,
    createWorkSession,
    deleteWorksession,
    updateWorkSession
} = require('../controllers/workSessionsController')

const WorkSession = require('../models/workSessionModel');

const router = express.Router();

// ROUTE HANDLERS

// GET all work sessions
router.get('/', getAllWorkSessions);

//GET a single work session
router.get('/:id', getWorkSession);

//POST(create) a new work session
router.post('/', createWorkSession);

//DELETE a work session
router.delete('/:id', deleteWorksession);

//PATCH (update) a work session
router.patch('/:id', updateWorkSession);

module.exports = router;