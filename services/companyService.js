const companyRepo = require('../repositories/companyRepo')

// Fetch all symbols - array of strings
const getAll = async () => {
    const all_companies = await companyRepo.getAllSymbols()
    const companies = all_companies.splice(0, 50)
    const symbols = companies.map(comp => comp.symbol)
    return symbols
    /* 
        TODO: use getProfile and getPrices for every symbol and return
        one array with each object represent: symbol, other relevant properties
        and inner-array of prices from last 30 days
    */ 
}
 
// Fetch info of company using symbol, returns: price, change, country, logo-image, market-cap  
const getProfile = async (symbol) => {
    const profile = await companyRepo.getCompProfile(symbol) 
    return profile
}

// Fetch up to 30 days of prices changes from current date back to same day last month 
const getPrices = async (symbol) => {
    const prices = await companyRepo.getCompPrices(symbol) 
    return prices
}

module.exports = {
    getAll,
    getProfile,
    getPrices
}