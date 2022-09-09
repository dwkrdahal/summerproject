const express = require("express");

const app = express();

const authroutes = require('./auth.routes');
const homeroutes = require('./home.routes');
const categoryroutes = require('./category.routes');
const productroutes = require('./product.routes');
const bannerroutes = require('./banner.routes');
const brandroutes = require('./brand.routes');
const userroutes = require('./user.routes');
const supplierroutes = require('./supplier.route')
const checkoutroutes = require('./checkout.routes')
const orderroutes = require('./order.routes')
const isLoggedIn = require('../middleware/isLoggedIn.middleware');

app.use('/', homeroutes);
app.use('/auth', authroutes);
app.use('/user', userroutes);
app.use('/category', isLoggedIn, categoryroutes);
app.use('/product', productroutes);
app.use('/banner', isLoggedIn, bannerroutes);
app.use('/brand', isLoggedIn, brandroutes);
app.use('/supplier', supplierroutes);
app.use('/checkout', checkoutroutes);
app.use('/order',orderroutes);

module.exports = app;