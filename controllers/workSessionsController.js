const WorkSession = require('../models/workSessionModel');
const mongoose = require('mongoose');

// get all work sessions
const getAllWorkSessions = async (req, res) => {
    // it's working but 
    // it's suppose to be from authorization header in browzer...
    const { user_id } = req.params;
    
    // Get only work seesions from this current month
    const currentDate = new Date();
    const yearMonth = currentDate.toISOString().slice(0, 7);

    const workSessions = await WorkSession.find({ 
        user_id,
        yearMonth 
    }).sort({createdAt: -1});

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
    const {user_id, clockIn, yearMonth, day} = req.body;

    // add doc to DB
    try {
        const workSession = await WorkSession.create({user_id, clockIn, yearMonth, day});
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
            error: 'No such work session'
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