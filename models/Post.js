const mongoose = require('mongoose');

// schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [
        {
            personId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            comment: {
                type: String,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.postId = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Post', postSchema);