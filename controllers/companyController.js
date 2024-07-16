const companyService = require("../services/companyService")
const express = require('express')
const jwt = require('jsonwebtoken')

// Entry point of http://localhost:3000/companies

const router = express.Router();

router.get('/', async (req, res) => {
    // const token = req.headers["x-access-token"]
    try {
        // jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const companies = await companyService.getAll()
        res.send(companies)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

router.get('/:symbol', async (req,res) => {
    // const token = req.headers["x-access-token"]
    try {
        // jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { symbol } = req.params
        const company = await companyService.getProfile(symbol)
        res.send(company)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

router.get('/prices/:symbol', async (req,res) => {
    // const token = req.headers["x-access-token"]
    try {
        // jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { symbol } = req.params
        const prices = await companyService.getPrices(symbol)
        res.send(prices)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

module.exports = router