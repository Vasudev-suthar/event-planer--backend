const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.userId = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('User', userSchema);