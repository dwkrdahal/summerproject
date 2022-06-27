const BrandModel = require("../model/brand.model");

class BrandController{
    index = (req, res, next) => {
        // list code 
        BrandModel.find()
        .then((brands) => {

            res.json({
                result: brands,
                status: true,
                msg: "List successfull."
            })
        })
        .catch((err) => {
            res.status(500).json({
                result: null,
                status: false,
                msg: JSON.stringify(err)
            })
        })
    }

    store = (req, res, next) => {
        let data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }

        let brand = new BrandModel(data);
        brand.save()
        .then((success) => {
            res.json({
                result: brand,
                status: true,
                msg: "Brand added successfully."
            })
        })
        .catch((err) => {
            res.status(500).json({
                result: null,
                status: false,
                msg: JSON.stringify(err)
            })
        })
    }

    getBrandById = (req, res, next) => {
        BrandModel.findById(req.params.id)
        .then((brand) => {
            res.json({
                result: brand,
                status: true, 
                msg: "Fetched"
            })
        })
        .catch((error) => {
            next({
                status: 500,
                msg: JSON.stringify(error)
            })
        })
    }

    updateBrand =  (req, res, next) => {
        let data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }

        BrandModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: data
            },
            {
                upsert: false
            }
        )
        .then((success) => {
            res.json({
                result: success,
                status: true,
                msg: "Brand updated successfully."
            })
        })
        .catch((err) => {
            res.status(500).json({
                result: null,
                status: false,
                msg: JSON.stringify(err)
            })
        })
    }

    deleteBrandById = (req, res, next) => {
        BrandModel.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.json({
                result: null,
                status: true,
                msg: "Brand deleted successfulluy."
            })
        })
        .catch((err) => {
           next({status: 500, msg: JSON.stringify(err)})
        })
    }
}

module.exports = BrandController;
