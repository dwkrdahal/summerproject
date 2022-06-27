const router = require("express").Router();
const ProductController = require("../controllers/product.controller");
const prodCtrl = new ProductController;
const upload = require("../middleware/uploader.middleware");
const isLoggedIn = require("../middleware/isLoggedin.middleware");

// http://domain/product/
router.route('/')
    .post(isLoggedIn, upload.array('image'), prodCtrl.addProduct)
    .get(prodCtrl.getAllProducts);

router.route("/:id")
    .put(isLoggedIn,upload.array('image'), prodCtrl.editProduct)
    .delete(isLoggedIn,prodCtrl.deleteProductById)
    .get(prodCtrl.getProductById);
module.exports = router;
