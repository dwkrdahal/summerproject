const Supplier = require("../model/supplier.model");

class SupplierController {
    getSupplierById = (req, res, next) => {
        let id = req.params.id;
        Supplier.findById(id)
            .then((supplier) => {
                res.json({
                    result: supplier,
                    status: true,
                    msg: "Supplier Fetched Successfully."
                })
            })
            .catch((err) => {
                res.json({
                    result: err,
                    status: false,
                    msg: "Error while fetching supplier"
                })
            })
    }

    getAllSuppliers = (req, res, next) => {
        Supplier.find({})
            .then((suppliers) => {
                res.json({
                    result: suppliers,
                    status: true,
                    msg: "All suppliers Fetched"
                })
            })
            .catch((err) => {
                res.json({
                    result: err,
                    status: false,
                    msg: "Error in fetching suppliers"
                })
            })

    }

    updateSupplierById = (req, res, next) => {
        let data = req.body;
        Supplier.updateOne({
                _id: req.params.id
            }, {
                $set: data
            })
            .then((success) => {
                res.json({
                    result: data,
                    status: true,
                    msg: "Supplier updated successfully"
                })
            })
            .catch((err) => {
                next({
                    status: 400,
                    msg: err
                })
            })
    }

    deleteSupplierById = (req, res, next) => {
        // supplier.findByIdAndDelete(req.params.id)
        Supplier.deleteOne({
                _id: req.params.id
            })
            .then((success) => {
                if (success.deletedCount > 0) {
                    res.json({
                        result: success,
                        status: true,
                        msg: "Supplier deleted Successfully"
                    })
                } else {
                    res.json({
                        result: success,
                        status: true,
                        msg: "Supplier Not found"
                    })
                }
            })
            .catch((error) => {
                next({
                    status: 400,
                    msg: error
                })
            })
    }
}

module.exports = SupplierController;