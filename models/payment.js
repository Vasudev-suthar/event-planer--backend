const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    razorpayDetails: {
        orderId: String,
        paymentId: String,
        signature: String,
        userId: String,
        notes: Object
    },
    success: Boolean,
})

paymentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.paymentId = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Payments', paymentSchema)