const mongoose = require('mongoose');

const studentSchemaa = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: false
    },
    mobileNo: {
        type: String
    },
    country: {
        type: String
    },
    streetAddress: {
        type: String
    },
    city: {
        type: String
    },
    region: {
        type: String
    },
    postalCode: {
        type: String
    },
    aadharNo: {
        type: String
    },
    about: {
        type: String
    },
    photo: {
        type: String
    }
});

const StudentModel = mongoose.model('Studentss', studentSchemaa);

module.exports = StudentModel;
