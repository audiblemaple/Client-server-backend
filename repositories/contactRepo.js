const contactModel = require("../models/contactModel")

// add new employee
const createContactInfo = async (contact) => {
    contact = new contactModel(contact)
    await contact.save()
    return contact
}

module.exports = {
    createContactInfo
}