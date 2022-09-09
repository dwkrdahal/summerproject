const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    description: {
        type: String
    },
    purch_price: {
        type: Number,
        required: true,
        min: 0
    },
    sell_price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    after_discount: {
        type: Number,
        required: true,
        default: 0
    },
    images: [{
        type: String
    }],
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    supplier: {
        type: mongoose.Types.ObjectId,
        ref: "Supplier"
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand"
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;