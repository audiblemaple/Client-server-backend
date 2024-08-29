const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("Connected to DB for client-server course project"))
    .catch((error) =>console.log(error))
}

module.exports = connectDB;
