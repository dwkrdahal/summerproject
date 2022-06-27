const router = require("express").Router();
const AuthController = require("../controllers/auth.controllers");
const authCtrl = new AuthController();
const upload = require("../middleware/uploader.middleware");
const isLoggedIn = require("../middleware/isLoggedIn.middleware");


router.post("/login", authCtrl.login)

router.post("/register",upload.array('image'), authCtrl.register);

router.post("/logout", authCtrl.logout);

router.post("/isAdmin", isLoggedIn, (req, res, next) => {
    res.json({
        result: req.auth_user,
        status: true,
        msg: "user"
    })
})

module.exports = router;