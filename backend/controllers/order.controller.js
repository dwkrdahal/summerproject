const OrderModel = require("../model/order.model");
const { generateRandomString } = require("../services/helpers");

class OrderController{
    
    getAllOrders = (req, res, next) => {
        OrderModel.find()
        .populate("product")
        .populate("user")
        .then((orders) => {
            if(orders) {
                res.json({
                    result: orders,
                    status: true,
                    msg: "Order List Fetched"
                })
            } else {
                res.json({
                    result: orders,
                    status: false,
                    msg: "Error! While fetching orders"
                })
            }
        })
        .catch((error) => {
            next({status:400, msg:error})
        })
    } 

    getOrderById = (req, res, next) => {
        let id = req.params.id;
        OrderModel.findById(id)
            .then((orders) => {
                res.json({
                    result: orders,
                    status: true,
                    msg: "order Fetched Successfully."
                })
            })
            .catch((err) => {
                res.json({
                    result: err,
                    status: false,
                    msg: "Error while fetching order"
                })
            })
    }

    updateOrderById = (req, res, next) => {
        let data = req.body;
        OrderModel.updateOne({
                _id: req.params.id
            }, {
                $set: data
            })
            .then((success) => {
                res.json({
                    result: data,
                    status: true,
                    msg: "Order updated successfully"
                })
            })
            .catch((err) => {
                next({
                    status: 400,
                    msg: err
                })
            })
    }

    deleteOrderById = (req, res, next) => {
        OrderModel.deleteOne({
                _id: req.params.id
            })
            .then((success) => {
                if (success.deletedCount > 0) {
                    res.json({
                        result: success,
                        status: true,
                        msg: "Order deleted Successfully"
                    })
                } else {
                    res.json({
                        result: success,
                        status: true,
                        msg: "Order Not found"
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

module.exports = OrderController;