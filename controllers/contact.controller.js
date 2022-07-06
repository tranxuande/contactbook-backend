const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
   if (!req.body?.name){
    return next (new ApiError(400, "Name is required"));
   }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Cannot create contact")
        );
    }
   
};

exports.findALL = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        // /api/contacts?name=De
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }

    } catch (error) {
        return next( new ApiError(500, "cannot get contacts"));
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        );
    }
};

exports.update = (req, res) => {
    res.send({ message: "update handler"});
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler"});
};

exports.deleteALL = (req, res) => {
    res.send({ message: "deleteALL handler"});
};

exports.findALLFavorite = (req, res) => {
    res.send({ message: "findALLFavorite handler"});
};
