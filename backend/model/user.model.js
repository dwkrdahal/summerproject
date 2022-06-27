const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 70,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'customer'],
        default: 'customer'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], 
        default: 'inactive'
    },
    image: [String],
    address: {
        type: String,
        required: true
    }    
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema)

module.exports = User;