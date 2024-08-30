const coinsRepo = require('../repositories/coinsRepo')
const formater = require('../utils/formatNumbers')
const util = require('../utils/inValidSymbols')

// Fetch all symbols - array of strings
const getAll = async () => {
    const {data: coinsData} = await coinsRepo.getAllSymbols()
    const coinsDataFiltered = coinsData.filter(coin => !util.inValidSymbols.has(coin.symbol))
    const coin_ids = coinsDataFiltered.map(coin => coin.id)
    const {data: metadata} = await coinsRepo.getAllLogos(coin_ids)
    
    // convert metadata object of coins objects to array of coins objects
    const arrayOfMetadata = Object.values(metadata)
    const ids_logos = arrayOfMetadata.map(coin => {return {id: coin.id, logo: coin.logo}})

    // Calculate the sum of all market caps
    let totalMarketCap = 0

    const formatCoins = coinsDataFiltered.map((coin, index) => {
        const id_logo = ids_logos.find(coinIdLogo => coinIdLogo.id === coin.id)
        // Sum up the market cap
        totalMarketCap += coin.quote.USD.market_cap

        return {
            rank: index+1,
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            widgetSymbol: "COINBASE:"+ coin.symbol + "USD",
            logo: id_logo.logo,
            price_toShow: formater.formatPrice(coin.quote.USD.price),
            price: coin.quote.USD.price,
            today_toShow: formater.formatToday(coin.quote.USD.percent_change_24h),
            today: coin.quote.USD.percent_change_24h,
            market_cap_toShow: formater.formatMarketCap(coin.quote.USD.market_cap),
            market_cap: coin.quote.USD.market_cap
        }

    })
    const formatTotalMC = formater.formatToTrillions(totalMarketCap)
    return {
        formatCoins,
        formatTotalMC
    }
}

module.exports = {
    getAll
}