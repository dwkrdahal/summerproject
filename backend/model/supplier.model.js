const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    address: {
        type: String,
        required: true
    },
    reg_type: {
        type: String,
        enum: ['PAN', 'VAT'],
        default: 'PAN'
    },
    reg_num: {
        type: Number,
            required: true
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = Supplier;