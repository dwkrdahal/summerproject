const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: String,
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true        // createdAt, updatedAt
});

const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;
