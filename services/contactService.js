const contactRepo = require('../repositories/contactRepo')

const createContact = async (contact) => {
    const new_contact = await contactRepo.createContactInfo(contact)
    return new_contact
}

module.exports = {
    createContact
}