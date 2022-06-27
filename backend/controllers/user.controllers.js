const User = require("../model/user.model");

class UserController {
    getUserById = (req, res, next) => {
        let id = req.params.id;
        User.findById(id)
            .then((user) => {
                res.json({
                    result: user,
                    status: true,
                    msg: "User Fetched Successfully."
                })
            })
            .catch((err) => {
                res.json({
                    result: err,
                    status: false,
                    msg: "Error while fetching user"
                })
            })
    }

    getAllUsers = (req, res, next) => {
        User.find({})
            .then((users) => {
                res.json({
                    result: users,
                    status: true,
                    msg: "All users Fetched"
                })
            })
            .catch((err) => {
                res.json({
                    result: err,
                    status: false,
                    msg: "Error in fetching users"
                })
            })

    }

    updateUserById = (req, res, next) => {
        let data = req.body;
        User.updateOne({
                _id: req.params.id
            }, {
                $set: data
            })
            .then((success) => {
                res.json({
                    result: data,
                    status: true,
                    msg: "User updated successfully"
                })
            })
            .catch((err) => {
                next({
                    status: 400,
                    msg: err
                })
            })
    }

    deleteUserById = (req, res, next) => {
        // user.findByIdAndDelete(req.params.id)
        User.deleteOne({
                _id: req.params.id
            })
            .then((success) => {
                if (success.deletedCount > 0) {
                    res.json({
                        result: success,
                        status: true,
                        msg: "User deleted Successfully"
                    })
                } else {
                    res.json({
                        result: success,
                        status: true,
                        msg: "User Not found"
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

module.exports = UserController;