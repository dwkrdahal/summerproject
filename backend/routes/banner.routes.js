const router = require("express").Router();
const BannerController = require("../controllers/banner.controller");
const isLoggedIn = require("../middleware/isLoggedIn.middleware");
const { isAdmin } = require("../middleware/rbac.middleware");
const upload = require("../middleware/uploader.middleware");

const bannerCtrl = new BannerController();


//get all banners
router.route("/")
    .get(bannerCtrl.index)
    .post(isLoggedIn, isAdmin, upload.single('image'), bannerCtrl.store);

router.route("/:id")
    .get(bannerCtrl.getBannerById)
    .put(isLoggedIn, isAdmin, upload.single('image', bannerCtrl.updateBanner))


module.exports = router;

