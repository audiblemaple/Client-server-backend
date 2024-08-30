const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Email = require('../utils/email');
const crypto = require('crypto');
const express = require('express');

const router = express.Router();
// Entry Point: http://localhost:3000/users

// create token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '90d'})
}

const createSendToken = (user, res) => {
    const token = createToken(user._id);

        res.status(201).json({
            status: "success",
            username: user.username,
            email: user.email,
            token,
            user_id: user._id
        })
}

// login user
router.post('/login', async (req, res) => {
    const {password, email} = req.body;
    
    // add doc to DB
    try {
        const user = await User.login(password, email);
        
        // create and send token
        createSendToken(user, res);
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
})

// signup user
router.post('/signup', async (req, res) => {
    const {username, password, email} = req.body;
    // add doc to DB
    try {
        const user = await User.signup(username, password, email);
        // create and send token
        createSendToken(user, res);
        // send welcome email
        await new Email(user, null).sendWelcome();
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
});


// Verify user token
router.get('/auth', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        res.send({message: "verified"});
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})


/*
// renew password
const forgotPassword = async (req, res) => {
    // Get user based on email
    const user = await User.findOne({ email: req.body.email });
    try {
        if (!user) {
            throw Error('Email does not exists');
        }

        // Generate the random reset token
        const resetToken = await user.createPasswordResetToken();
        await user.save({validateBeforeSave: false});

        // Send it to user's email
        const resetURL = `${req.protocol}://${req.get(
            'host'
            )}/api/user/reset_password/${resetToken}`;

        res.status(200).json({
            status: "success",
            message: 'Password reset token generated and sent to email',
            // resetToken - not in res, only on email!
        })


        await new Email(user, resetURL).sendPasswordReset();
        
    } catch (error) {
        if (user) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({validateBeforeSave: false});
        }
        const status_code = !user ? 400 : 500;
        res.status(status_code).json({
            status: 'fail',
            error: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    // get user based on token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({ 
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now() }
    });

    try {
        // If token has not expired, and there is user, set new password
        if (!user) {
            throw Error('Token is invalid or expired');
        }

        // send user.password to userModel function so it will hash it
        const new_password = await User.renewPassword(req.body.password);

        user.password = new_password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // create and send token
        createSendToken(user, res);

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: error.message
        })
    }
}


*/

module.exports = router