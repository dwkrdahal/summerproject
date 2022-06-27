const router = require("express").Router();

router.get('/', (req, res, next) => {
    let home = {
        banner: [],
        product: []
    }
    res.status(404).json(home);
    // res.jsonp
    // res.render
    // res.download
    // res.status
    // res.statusCode
    // res.redirect
    // res.end();
});

router.get('/about', (req, res, next) => {

});




module.exports = router;