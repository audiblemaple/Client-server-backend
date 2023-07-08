const WorkSession = require('../models/workSessionModel');
const mongoose = require('mongoose');

// get all work sessions
const getAllWorkSessions = async (req, res) => {
    const workSessions = await WorkSession.find({}).sort({createdAt: -1});

    res.status(200)
    .json({
        status: 'success',
        requstedAt: req.requestTime,
        workSessions
    });
}

// get a single work session
const getWorkSession = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 'fail',
            error: 'Invalid user id'
        })
    }

    const workSession = await WorkSession.findById(id)

    checkWorkSessionStatus(workSession, res);
}

// create a new work session
const createWorkSession = async (req, res) => {
    const {user, clockIn} = req.body;

    // add doc to DB
    try {
        const workSession = await WorkSession.create({user, clockIn});
        res.status(201).json({
            status: "success",
            workSession
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
}

// delete a work session
const deleteWorksession = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 'fail',
            error: 'Invalid user id'
        })
    }

    const workSession = await WorkSession.findOneAndDelete({_id: id})

    checkWorkSessionStatus(workSession, res);
}

// update a work session
const updateWorkSession = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 'fail',
            error: 'Invalid user id'
        })
    }

    const workSession = await WorkSession.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    checkWorkSessionStatus(workSession, res);
}

// inner function to check if work session is null and then
// generate a response accordingly
function checkWorkSessionStatus (workSession, res) {
    if (!workSession) {
        return res.status(400).json({
            status: 'fail',
            error: 'No such user'
        })
    }
    
    res.status(200).json({
        status: 'success',
        workSession
    });
}

module.exports = {
    getAllWorkSessions,
    getWorkSession,
    createWorkSession,
    deleteWorksession,
    updateWorkSession
}