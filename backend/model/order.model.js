const mongoose = require("mongoose");

const OrderSchemaDef = new mongoose.Schema({
    cart_id: {
        type:String,
        required:true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required:true
    },
    title:{
        type: String,
        required: false
    },
    image:{
        type: String
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sub_total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["new",'cancelled', "processing", "delivered"],
        default: "new"
    }
}, {
    timestamps: true
});

const OrderModel = mongoose.model("Order", OrderSchemaDef);
module.exports = OrderModel;