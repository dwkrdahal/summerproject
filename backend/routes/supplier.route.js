const express = require("express");
const router = express.Router();
const SupplierController = require("../controllers/supplier.controller");
const isLoggedIn = require('../middleware/isLoggedIn.middleware');
const { isAdminStaff } = require("../middleware/rbac.middleware");


const suppCtrl = new SupplierController;

router.route("/:id")
    .get(suppCtrl.getSupplierById)
    .put( suppCtrl.updateSupplierById)
    .delete(suppCtrl.deleteSupplierById)

router.route('/')
    .post(isLoggedIn, suppCtrl.addSupplier)
    .get(suppCtrl.getAllSuppliers);

module.exports = router;