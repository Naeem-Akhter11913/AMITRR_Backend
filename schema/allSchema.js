const mongoose = require('mongoose');

// Define the user schema
const marksSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.ObjectId,
        required: false
    },
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String, 
        required: true 
    },
    totalMarks: {
        type: String,
        required: true
    },
    testLang: {
        type: String,
        required: true,
    },


}, {
    timestamps: true
});

// Create the User model
const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
