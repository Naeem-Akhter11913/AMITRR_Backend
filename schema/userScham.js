const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'sub',
        enum : ['sub',"admin"]
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
