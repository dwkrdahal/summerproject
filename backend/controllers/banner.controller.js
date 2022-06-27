const BannerModel = require("../model/banner.model")

class BannerController {

    index = (req, res, next) => {
        //list code
        BannerModel.find()
            .then((banners) => {
                res.json({
                    result: banners,
                    status: true,
                    msg: "Listed successfully"
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

        let banner = new BannerModel(data);
        banner.save()
        .then((success) => {
            res.json({
                result: banner,
                status: true,
                msg: "Banner Added Successfully"
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

    getBannerById = (req, res, next) =>{
        BannerModel.findById(req.params.id)
        .then((banner) => {
            res.json({
                result: banner,
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

    updateBanner = (req, res, next) => {
        let data = req.body;

        if(req.file){
            data.image = req.file.filename;

        }

        BannerModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: data
            }
        )
        .then((success) => {
            res.json({
                result: success,
                status: true,
                msg: "Banner Updated Successfully"
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
    
}

module.exports = BannerController;