const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn.middleware');
const upload = require("../middleware/uploader.middleware");

const CheckoutController = require("../controllers/checkout.controller");
const checkCtrl = new CheckoutController();

router.route('/')
.post(isLoggedIn, upload.single('image'), checkCtrl.createOrder)
    
module.exports = router;