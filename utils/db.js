const mongoose = require("mongoose");

// Connection URL for MongoDB
const dbURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vfmayy0.mongodb.net/?retryWrites=true&w=majority`;

// Exporting connection to be used in main index.js
module.exports = {
    connect: async () => {
        try {
            await mongoose.connect(dbURL);
            console.log("Connected to DB");
        } catch (error) {
            console.log(error);
        }
    },
};
