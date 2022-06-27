const express = require("express");
const router = express.Router();
const { isAdminStaff } = require('../middleware/rbac.middleware')

const categoryController = require("../controllers/category.controllers");
const catCtrl = new categoryController();

router.route('/')
    .post(catCtrl.createCategory)
    .get(catCtrl.getAllCategories)

router.route('/:id')
    .get(catCtrl.getCategoryById)
    .patch(catCtrl.updateCategoryById)
    .delete(catCtrl.deleteCategoryById)

module.exports = router;