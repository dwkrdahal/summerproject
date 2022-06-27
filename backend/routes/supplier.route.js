const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/supplier.controllers");
const isLoggedIn = require('../middleware/isLoggedIn.middleware');


const suppCtrl = new SupplierController;

router.route("/:id")
    .get(suppCtrl.getSupplierById)
    .patch(isLoggedIn, suppCtrl.updateSupplierById)
    .delete(suppCtrl.deleteSupplierById)

router.get("/", suppCtrl.getAllSuppliers)


module.exports = router;