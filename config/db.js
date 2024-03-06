const mongoose = require("mongoose");
require("dotenv").config();

const mongoosURL = process.env.MONGODB_URI

mongoose.connect(mongoosURL)
    .then(() => console.log("DB is connected successfull"))
    .catch((err) => console.log("connection Error", err)) 