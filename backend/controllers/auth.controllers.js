const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const getSingleRow = require('../services/db.service');
// const { dbUrl, dbName } = require('../config/db.config');
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

class AuthController {
    login = (req, res, next) => {
        // console.log("Process: ", process.env);
        //db connect

        User.findOne({
                email: req.body.email,
                // password: req.body.password
            })
            .then((response) => {
                if (response) {


                    if (bcrypt.compareSync(req.body.password, response.password)) {
                        res.json({
                            // generating token
                            result: {
                                user: response,
                                token: generateToken({
                                    user_id: response._id,
                                    name: response.name,
                                    email: response.email,
                                    role: response.role,
                                    status: response.status
                                })
                            },
                            status: 200,
                            msg: "Login Successful"
                        })
                    } else {
                        next({
                            status: 400,
                            msg: "Credentials doesnot match"
                        })
                    }

                } else {
                    next({
                        status: 400,
                        msg: "User doesnot exists"
                    })
                }
            })
            .catch((error) => {
                next({
                    status: 400,
                    msg: "Credentials doesnot match"
                })
            })

    }

    register = (req, res, next) => {
        let data = req.body;

        if(req.files){
            data.image = req.files[0].filename;
        }

        // find user existence
        User.findOne({
                email: data.email
            })
            .then((user) => {
                if (user) {
                    next({
                        error: 400,
                        msg: "Email address already exists"
                    })
                } else {
                    // password encrypt
                    let hashPass = bcrypt.hashSync(data.password, 10);
                    data.password = hashPass;

                    let user = new User(data); // user model
                    user.save()
                        .then((ack) => {
                            res.json({
                                result: user,
                                status: true,
                                msg: "User Registered Successfully"
                            })
                        })
                        .catch((err) => {
                            res.status(404).json({
                                result: err,
                                status: false,
                                msg: "Error while registering the user"
                            })
                        })
                }
            })
            .catch((err) => {
                next({
                    status: 400,
                    msg: "Error while registering users"
                })
            })


    }

    logout = (req, res, next) => {

    }

}

module.exports = AuthController;