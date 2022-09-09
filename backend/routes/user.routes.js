const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const isLoggedIn = require('../middleware/isLoggedIn.middleware');


const usrCtrl = new UserController;

router.route("/:id")
    .get(usrCtrl.getUserById)
    .put(isLoggedIn, usrCtrl.updateUserById)
    .delete(usrCtrl.deleteUserById)

router.get("/", usrCtrl.getAllUsers)


module.exports = router;