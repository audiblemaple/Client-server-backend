const mongoose = require('mongoose');
const validator = require ('validator');

const contactSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        validate: [validator.isEmail]
    },
    subject: String,
    message: String
}); 

module.exports = mongoose.model("contact", contactSchema, "contact");