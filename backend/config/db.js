const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongoDB = mongoose.connection;

mongoDB.on("error", console.error.bind(console, 'MongoDB connection error: '));

mongoDB.once('open', () => {
    console.log("Connected to MongoDB");
})

module.exports = mongoDB;





