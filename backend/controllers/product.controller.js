const Product = require("../model/product.model");

class ProductController{
    addProduct = (req, res, next) => {
        let data = req.body;

        if(req.files) {
            let images = [];
            req.files.map((o) => {
                images.push(o.filename);
            })
            data.images = images
        }

        data.after_discount = data.price-data.price * data.discount/100;
     
        let product = new Product(data);
        product.save()
        .then((response) => {
            res.json({
                result: product,
                status: true,
                msg: "Product created successfully."
            })
        })
        .catch((error) => {
            console.log("Error: ", error);
            res.status(400).json({
                result: data,
                status: false,
                msg: "Sorry! There was problem while adding product."
            })
        })
    }

    editProduct = (req, res, next) => {
        let data = req.body;

        if(data.images) {
            data.images = data.images.split(",");
        }

        console.log(data.images);
        if(req.files) {
            let images = [];
            req.files.map((o) => {
                images.push(o.filename);
            })

            data.images = [...data.images, ...images]
        }

        data.after_discount = data.price-data.price * data.discount/100;

        Product.findById(req.params.id)
        .then((product) => {
            if(product){
                return Product.updateOne({
                    _id: product._id
                }, {
                    $set: data
                })
            } else {
                next({status: 400, msg: "Product does not exists"})
            }
        })
        .then((update) => {
            res.json({
                result: data,
                status: true,
                msg: "Product updated successfully."
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                result: data,
                status: false,
                msg: "Sorry! There was problem while updating product."
            })
        })
    }

    getProductById = (req, res, next) => {
        Product.findById(req.params.id)
        .populate('supplier')
        .populate('brand')
        .then((product) => {
            if(product) {
                res.json({
                    result: product,
                    status: true,
                    msg: "Fetched"
                })
            } else {
                res.json({
                    result: product,
                    status: false,
                    msg: "Sorry! Product does not exists."
                })
            }
        })
        .catch((error) => {
            next({status:400, msg:"Error while fetching the data"})
        })
    }

    deleteProductById = (req, res, next) => {
        Product.findByIdAndDelete(req.params.id)
        .then((success) => {
            if(success) {
                res.json({
                    result: true,
                    status: true,
                    msg: "Product deleted successfully."
                })
            } else {
                res.json({
                    result: null,
                    status: false,
                    msg: "Sorry! Product could not be deleted at this moment"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            next({status:400, msg:"Error while deleting the data"})
        })
    }

    getAllProducts = (req, res, next) => {
        Product.find()
        .populate('supplier')
        .populate('brand')
        .then((products) => {
            if(products) {
                res.json({
                    result: products,
                    status: true,
                    msg: "Fetched"
                })
            } else {
                res.json({
                    result: products,
                    status: false,
                    msg: "Sorry! Products does not exist."
                })
            }
        })
        .catch((error) => {
            next({status:400, msg:"Error while fetching the data"})
        })
    }   
}

module.exports = ProductController;
