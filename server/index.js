const express = require("express");
const app     = express();
const server  = require("http").Server(app);
const helmet  = require("helmet");
const morgan  = require('morgan');
const Port    = process.env.PORT || 3008;
var cors = require('cors');
var moment = require('moment')

app.use(cors());

var bodyParser = require('body-parser');
const path     = require('path');
const listEndpoints = require('express-list-endpoints');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+'./uploads')));




app.use(helmet());
app.use(morgan('dev'));


const { admin }  = require('./routes');
app.use('/api/v1',[admin]);

const connection = require('./connection/connection');

app.use(express.static(path.join('../dist/showaide')));

app.all('*',(req,res)=>{
  res.sendFile('/', {root: '../dist/showaide'});
});


app.use( (req,res,next) => {

    const error = new Error(`${req.originalUrl} Not Found`);
    error.status = 404;
    next(error);

});


app.use( (error,req,res,next) => {

    if (error) {
        res.send({
            status:error.status || 500,
            message:error.message,
            body:{}
        });
    }
});



server.listen(Port, () => {
    console.log(`Serving is listening to ${Port}`);
    console.log(listEndpoints(app));
});



