const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/project-mgt-db',{ }).then(() => {
        console.log("MongoDB connected succesfully");
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectDB;