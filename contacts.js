const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db/contacts.json');
const crypto = require('crypto');

async function listContacts() {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    const contactById = contacts.find((contact) => contact.id === contactId);
    if (!contactById) {
        return null;
    }
    return contactById;
}

async function removeContact(contactId) {
    const contacts = await listContacts();

    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [remContact] = contacts.splice(idx, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return remContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();

    const newContact = {
        id: crypto.randomUUID(),
        name,
        email,
        phone,
    }

    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}