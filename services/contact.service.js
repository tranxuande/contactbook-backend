const { objectId } = require ("mongodb");
class ContactService { 
    constructor(client) {
        this.contact = client.db().collection("contacts");

    }

    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,   
        };

        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true} },
            { returndocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findId(id) {
        return await this.Contact.findOne({
            _id: objectId.isvalid(id) ? new objectId(id) : null,
        });
    }
}
module.exports = ContactService;
