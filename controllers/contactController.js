const contactService = require("../services/contactService")
const express = require('express')
const Email = require('../utils/email');
// const jwt = require('jsonwebtoken')

// Entry point of http://localhost:3000/contacts

const router = express.Router();

router.post('/', async (req, res) => {
    // const token = req.headers["x-access-token"]
    const {fullName, email, subject, message} = req.body;
    try {
        // jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const contact = await contactService.createContact({fullName, email, subject, message})
        res.status(201).json({
            status: "success",
            contactInfo_id: contact._id,
            message
        })

        // send contact-us email
        const user = {email, username: fullName, query_subject: subject, message}
        await new Email(user, null).sendContactUs();

    } catch (e) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
})

module.exports = router