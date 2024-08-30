const API_KEY = process.env.API_KEY
const axios = require("axios")
const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=143&convert=USD'
// This is url of https://pro.coinmarketcap.com/
// Single API call for 5000 currencies and their data


// get all currencies and their data
const getAllSymbols = async () => {
    const { data: companies } = await axios.get(url, {
        headers: {
            'X-CMC_PRO_API_KEY': `${API_KEY}`
        },
    })
    return companies
}

//get all symbols logos
const getAllLogos = async (ids) => {
    let url_logos = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?aux=logo&id=" + ids.join(',');
    const {data: metadata} = await axios.get(url_logos, {
        headers: {
            'X-CMC_PRO_API_KEY': `${API_KEY}`
        },
    })
    return metadata
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
    getAllLogos
}