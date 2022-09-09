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
        data.created_by = req.auth_user._id;

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
            },{
                upsert: false
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

    deleteBannerById = (req, res, next) => {
        BannerModel.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.json({
                result: null,
                status: true,
                msg: "Banner Deleted Successfully"
            })
        })
        .catch((error) => {
            next({status:500, msg: JSON.stringify(error)})
        })
    }   

    getBannerForHome = (req, res, next) => {
        BannerModel.find({
            status: "active"
        })
        .limit(5)
        .sort({
            _id: 1
        })
        .then((banners) => {
            res.json({
                result: banners,
                status: true,
                msg: "Banner Fetched"
            })
        })
        .catch((err) => {
            res.json({
                result: null,
                status: false,
                msg: "Sorry! there occurs a problem"
            })
        })
    }
}

module.exports = BannerController;