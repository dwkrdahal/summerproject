const OrderModel = require("../model/order.model");
const { generateRandomString } = require("../services/helpers");

class CheckoutController{
    
    createOrder = (req, res, next) => {
        console.log("I reached here");
        let data = req.body;
        let order_data= [];
        let cart_id = generateRandomString(10);

        data.map((item) => {
            let cart_item = {
                cart_id: cart_id,
                user: req.auth_user._id,
                product: item.product_id,
                qty: item.qty,
                price: item.price,
                sub_total: item.total_amt,
                status: 'new'
            };

            order_data.push(cart_item);
        })
        console.log("Order: ",order_data);
        OrderModel.insertMany(order_data)
        .then((response) => {
            res.json({  
                result: order_data,
                status: true, 
                msg: "Order placed successfully."
            })
        })
        .catch((error) => {
            next({status: 400, msg: JSON.stringify(error)})
        })
        
    }

}

module.exports = CheckoutController;