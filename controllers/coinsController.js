const companyService = require("../services/coinsService")
const express = require('express')
const jwt = require('jsonwebtoken')

// Entry point of http://localhost:3000/coins

const router = express.Router();

router.get('/', async (req, res) => {
    // const token = req.headers["x-access-token"]
    try {
        // jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const coins = await companyService.getAll()
        res.send(coins)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

module.exports = router