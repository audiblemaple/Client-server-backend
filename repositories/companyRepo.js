const API_KEY = process.env.API_KEY
const axios = require("axios")
const url = 'https://financialmodelingprep.com/api/v3/'
// This is url of https://site.financialmodelingprep.com/
// Provides 250 API calls per day


// get all company (stocks) symbols
const getAllSymbols = async () => {
    const { data: companies } = await axios.get(url + 'stock/list?count=50&apikey=' + API_KEY)
    return companies
}

// get company profile
const getCompProfile = async (comp_symbol) => {
    const { data: company} = await axios.get(`${url}profile/${comp_symbol}?apikey=${API_KEY}`)
    return company
}

// get company prices for last 30 days
const getCompPrices = async (comp_symbol) => {
    // historical-price-full/AAPL?limit=100&from=2024-06-14&to=2024-07-14&apikey=5CMNaZPp3oV8g41SJXr3EcBsKwZ2n3tT
    const to = doCurrentDate(false) // today's date  
    const from = doCurrentDate(true) // today's date minus one month
    const query = `${url}historical-price-full/${comp_symbol}?limit=30&from=${from}&to=${to}&apikey=${API_KEY}`
    const { data: history} = await axios.get(query)
    return history
}

// return today's date in yyyy-mm--dd format
const doCurrentDate = (isFrom) => {
    const date = new Date();
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day
    let month = date.getMonth() + 1;
    month = isFrom ? (month-1==0 ? 12 : month-1) : month
    month = month < 10 ? `0${month}` : month
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    return currentDate
}

module.exports = {
    getAllSymbols,
    getCompProfile,
    getCompPrices
}