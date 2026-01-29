const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mentions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            offset:{
                type: Number,
            },
            length:{
                type: Number,
            }
        }
    ],
    reactions: [
        {
            emoji: {
                type: String,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        }
    ],
    isEdited: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
