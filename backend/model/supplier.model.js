const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
    company: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    status: {
        type: String.apply,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    address: {
        type: String,
        required: true
    },
    regstration: {
       type: 
        {
            type: String,
            enum: ["PAN", "VAT"],
            default: 'PAN'
        },
        number: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true
});

const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = Supplier;