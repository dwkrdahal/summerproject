const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
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
    timestamps: true
});


const BannerModel = mongoose.model("Banner", BannerSchema);

module.exports = BannerModel;