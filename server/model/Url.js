const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    url: {
        type: String,
    },
    expectedResponseTime: {
        type: String
    },
    pingData: [{
        status: {
            type: Boolean,
        },
        responseDuration: {
            type: String
        },
        timeOfRequest: {
            type: Date
        },
        timeOfResponse: {
            type: Date
        }
    }]
}, {
    timestamps: true
})
module.exports = mongoose.model('url', urlSchema)