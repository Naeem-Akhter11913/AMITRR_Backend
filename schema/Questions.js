const mongoose = require('mongoose');

// Define the user schema
const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    wrongAnswers: {
        type: [String], // Define as an array of strings
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Questions = mongoose.model('Questions', QuestionSchema);

module.exports = Questions;
