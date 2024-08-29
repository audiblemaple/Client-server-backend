function formatMarketCap(num) {
    // Convert the number to a string with fixed decimal points
    let formattedNumber = parseFloat(num).toFixed(0)

    // Use a regular expression to add commas as thousand separators
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    formattedNumber += ' $'

    return formattedNumber
}

function formatPrice(num) {
    // Convert the number to a string with fixed decimal points
    let formattedNumber = parseFloat(num).toFixed(2)

    // Use a regular expression to add commas as thousand separators
    formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    formattedNumber += ' $'

    return formattedNumber
}

function formatToday(num) {
    // Convert the number to a string with fixed decimal points
    let formattedNumber = parseFloat(num).toFixed(3)
    
    if (num > 0) {
        formattedNumber = '+'+formattedNumber
    }
    formattedNumber += ' %'
    return formattedNumber
}

function formatToTrillions(num) {
    // Convert the number to trillions
    const trillions = num / 1e12

    // Format the number to two decimal places
    const formattedNumber = trillions.toFixed(2)

    // Return the formatted string with a $ sign and 'T' suffix
    return `$${formattedNumber}T`
}

module.exports = {
    formatMarketCap,
    formatPrice,
    formatToday,
    formatToTrillions
}

