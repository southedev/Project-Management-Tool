const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
        default: 'Planning'
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    watchers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    dueDate: {
        type: Date
    },
    estimatedHours: {
        type: Number,
        min: 0
    },
    actualHours: {
        type: Number,
        min: 0
    },
    tags: [
        {
            type: String,
        }
    ],
    subtasks: [
        {
            title: {
                type: String,
                required: true,

            },
            completed: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    attachments: [
        {
            fileName: {
                type: String,
                required: true
            },
            fileUrl: {
                type: String,
                required: true
            },
            fileType: {
                type: String,
            },
            fileSize: {
                type: Number,
            },
            uploadedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
