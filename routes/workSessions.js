const express = require('express');
const {
    getAllWorkSessions,
    getWorkSession,
    createWorkSession,
    deleteWorksession,
    updateWorkSession
} = require('../controllers/workSessionsController')
//const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all worksessions routes
//router.use(requireAuth);

// ROUTE HANDLERS

// GET all work sessions
router.get('/:user_id', getAllWorkSessions);

//GET a single work session
router.get('/:id', getWorkSession);

//POST(create) a new work session
router.post('/', createWorkSession);

//DELETE a work session
router.delete('/:id', deleteWorksession);

//PATCH (update) a work session
router.patch('/:id', updateWorkSession);

module.exports = router;