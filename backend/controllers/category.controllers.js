const Category = require("../model/category.model");

class categoryController {
    createCategory = (req, res, next) => {
        let data = req.body;

        if(req.file){
            data.image = req.file.filename;
        }
        data.created_by = req.auth_user._id;

        let cat = new Category(data);
        cat.save()
            .then((response) => {
                res.json({
                    result: cat,
                    status: true,
                    msg: "Category Created Successfully"
                })
            })
            .catch((err) => {
                next({
                    status: 400,
                    msg: err
                })
            })
    }

    getAllCategories = (req, res, next) => {
        Category.find()
            // .populate("created_by")
            .then((cats) => {
                res.json({
                    result: cats,
                    status: true,
                    msg: "Category fetched"
                })
            })
            .catch((error) => {
                next({
                    status: 400,
                    msg: "Problem while fetching categories"
                })
            })
    }

    getCategoryById = (req, res, next) => {
        let id = req.params.id;
        Category.findById(id)
            .then((cats) => {
                res.json({
                    result: cats,
                    status: true,
                    msg: "category Fetched Successfully."
                })
            })
            .catch((err) => {
                res.json({
                    result: err,
                    status: false,
                    msg: "Error while fetching category"
                })
            })
    }

    updateCategoryById = (req, res, next) => {
        let data = req.body;
        Category.updateOne({
                _id: req.params.id
            }, {
                $set: data
            })
            .then((success) => {
                res.json({
                    result: data,
                    status: true,
                    msg: "Category updated successfully"
                })
            })
            .catch((err) => {
                next({
                    status: 400,
                    msg: err
                })
            })
    }

    deleteCategoryById = (req, res, next) => {
        // Category.findByIdAndDelete(req.params.id)
        Category.deleteOne({
                _id: req.params.id
            })
            .then((success) => {
                if (success.deletedCount > 0) {
                    res.json({
                        result: success,
                        status: true,
                        msg: "Category deleted Successfully"
                    })
                } else {
                    res.json({
                        result: success,
                        status: true,
                        msg: "Category Not found"
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

module.exports = categoryController;