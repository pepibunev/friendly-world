const Animal = require('../models/Animal');

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getOnlyTree = () => Animal.find({}, {}, { sort: { _id: -1 } }).limit(3).lean();

exports.getOne = (animalId) => Animal.findById(animalId);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.search = async (search) => {
    const regex = new RegExp(search, 'i');
    const results = await Animal.find({ location: { $regex: regex } }).lean();

    return results;
};

exports.addDonation = async (animalId, userId) => {
    const animal = await Animal.findById(animalId);

    animal.donation.push(userId);

    return animal.save();
};

