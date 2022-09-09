const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn.middleware');
const upload = require("../middleware/uploader.middleware");

const OrderController = require("../controllers/order.controller");
const orderCtrl = new OrderController();

router.route('/')
    .get(orderCtrl.getAllOrders)

router.route("/:id")
    .put(isLoggedIn, orderCtrl.updateOrderById)
    .delete(isLoggedIn, orderCtrl.deleteOrderById)
    .get(orderCtrl.getOrderById);

module.exports = router;