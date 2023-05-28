const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
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
        type: String,
        required: true
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

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
