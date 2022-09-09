const express = require("express");
const router = express.Router();
const { isAdminStaff } = require('../middleware/rbac.middleware');
const isLoggedIn = require('../middleware/isLoggedIn.middleware');
const upload = require("../middleware/uploader.middleware");

const categoryController = require("../controllers/category.controllers");
const catCtrl = new categoryController();

router.route('/')
.get(catCtrl.getAllCategories)
.post(isLoggedIn, isAdminStaff, upload.single('image'), catCtrl.createCategory)
    
router.route('/:id')
    .get(catCtrl.getCategoryById)
    .patch(isLoggedIn, isAdminStaff, upload.single('image'), catCtrl.updateCategoryById)
    .delete(isLoggedIn, isAdminStaff, catCtrl.deleteCategoryById)

module.exports = router;