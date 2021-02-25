const mongoose = require('mongoose');
exports.connectDb = () => {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
        console.log("Db connected")
    })
}