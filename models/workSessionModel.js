const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workSessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    clockIn: {
        type: Date,
        required: true
    },
    clockOut: {
        type: Date
    },
    duration: {
        type: Number
    },
    user_note: {
        type: String
    },
    working_from: {
        type: String
    }
});

module.exports = mongoose.model('WorkSession', workSessionSchema);
// we created module that we import where we need
// we use the import to interact with the 'Users' collection that
// is generated automatically