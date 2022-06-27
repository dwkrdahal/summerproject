const express = require("express");
const app = express();
const cors = require("cors");

// process.env.MONGO_URL = "mongodb://localhost:27017";
// process.env.DB_NAME = "stack-6";
process.env.JWT_SECRET = "Summer_Project";

require("./db.init");

const routes = require("./routes/index.routes");

// to enable cors policy
app.use(cors());

app.use('/assets', express.static(process.cwd()+'/uploads'));

app.set('view engine', 'pug');
app.set('view', process.cwd() + '/views')

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))


app.use('/', routes);

app.use((req, res, next) => {
    next({
        status: 404,
        msg: "Resources not found"
    });
});


app.use((error, req, res, next) => {
    console.log(error);
    let code = error.status || 500;
    let msg = error.msg || null;

    res.status(code).json({
        data: null,
        status: false,
        msg: msg
    });
});


app.listen(9017, 'localhost', (err) => {
    if(!err){
        console.log("Listening to port 9017")
    } else{
        console.log("Error while listening to port", err);
    }
})