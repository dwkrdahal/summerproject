const router = require("express").Router();
const BrandController =  require("../controllers/brand.controller");
const isLoggedIn = require("../middleware/isLoggedin.middleware");
const {isAdminStaff}= require("../middleware/rbac.middleware");
const upload = require("../middleware/uploader.middleware");

const brandCtrl = new BrandController();


// get All brands 
router.route("/")
    .get(brandCtrl.index)
    .post(isLoggedIn, isAdminStaff, upload.single('image'), brandCtrl.store);

router.route("/:id")
    .get(brandCtrl.getBrandById)
    .put(isLoggedIn, isAdminStaff, upload.single('image'), brandCtrl.updateBrand)
    .delete(isLoggedIn, isAdminStaff, brandCtrl.deleteBrandById)
module.exports = router;
