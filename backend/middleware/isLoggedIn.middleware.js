const jwt = require("jsonwebtoken");
const User = require("../model/user.model")


const isLoggedIn = (req, res, next) => {
    let token;

    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }

    if (req.headers['x-xsrf-token']) {
        token = req.headers['x-xsrf-token'];
    }

    if (req.query.token && req.query.token) {
        token = req.query.token
    }

    if (!token) {
        next({
            status: 400,
            msg: "Token is not provided"
        })
    }
    token = token.split(" ");

    if (token.length > 1) {
        token = token[token.length - 1];
    } else {
        token = token[0];
    }

    let data = jwt.verify(token, process.env.JWT_SECRET);
    if (data) {

        //validation

        User.findById(data.user_id)
            .then((user) => {

                if (user) {
                    req.auth_user = user;
                    next();
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
                    msg: error
                })
            })
    } else {
        next({
            status: 400,
            msg: "Invalid token"
        })
    }
}

module.exports = isLoggedIn;