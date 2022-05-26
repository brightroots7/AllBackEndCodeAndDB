const bcrypt     = require('bcryptjs');
const saltRounds = 10;
const waterfall  = require('async-waterfall');
var   jwt        = require('jsonwebtoken');
const secretKey  = "secret007";
const _          = require('lodash');
const async     = require("async");
const DIR        = './uploads';


const Models = require('../models');


const csv = require('csvtojson');
var AWS  = require('aws-sdk');
const fs = require('fs');


const BUCKET     = 'moodvies';
const REGION     = 'us-east-1';
const ACCESS_KEY = 'AKIASDRRMAP3BQUONOA2';
const SECRET_KEY = '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';

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
});

var s3 = new AWS.S3();


exports.adminLogin              =   adminLogin;
exports.getUserListing          =   getUserListing;
exports.getMoviesListing        =   getMoviesListing;
exports.getAllCount             =   getAllCount;
exports.getAdminDetails         =   getAdminDetails;
exports.updateAdminDetails      =   updateAdminDetails;
exports.upload                  =   upload;
exports.importCsvFile           =   importCsvFile;



async function importCsvFile(req, res, cb) {

        const { csv_file } = req.body;
        let token = jwt.verify(req.headers['authorization'], secretKey)
        let response = {
                        status : 200,
                        data : {},
                        message : ''
                        }

         console.log(csv_file);

        try {

              const jsonArray = await csv().fromFile(csv_file);

              const insert_many_json = await Models.MovieCollection.insertMany(
                 jsonArray
              ).then( () => {

                fs.unlink(`${csv_file}`,(erro)=>{})

                response.status = 200;
                response.message = "File has been imported successfully ...";
                res.json(response);

              })
              .catch( (error) => {
                console.log(error);
                response.status = 400;
                response.message = "Something went wrong"
                res.json(response)
              })


              // console.log(jsonArray);
        }
        catch(error){
                console.log(error);
                response.status = 401;
                response.message = "Something went wrong"
                res.json(response);
        }

}

function upload(req, res, cb) {
  let response = {
    status: 0,
    data: {},
    message: ""
  }

  new Promise((resolve, reject) => {
    waterfall([
        uploadtolocal,
        uploadtoAws
    ], (error, result) => {
      error ? reject(error) : resolve(result)
    })
  })
  .then((resp) => {
    res.json(resp);
  })
  .catch((error) => {
    console.log(error);
    response.status  = 400;
    response.message = 'Something went wrong';
    res.json(response);
  })

  function uploadtolocal(cb)
  {
    if (!req.files) {
      response.status  = 400;
      response.message = "No file received";
      cb(response);
    } else {

      // console.log(req.files);
       response.status     = 200;
       response.data.image = req.files;
       res.json(response);
        // cb(null, response);
      // cb(null, req.files);
    }
  }

  function uploadtoAws(data, cb)
  {
     var ResponseData = [];

      if(data.length > 0) {

    data.map((item) => {
        let localImage = item.path;
        let imageRemoteName;
        var ext = item.originalname.split('.').pop();

        if(ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg')
        imageRemoteName = `catImage_${new Date().getTime()}.${ext}`;
        else
        imageRemoteName = `catImage_${new Date().getTime()}.png`;

       s3.putObject({
        Bucket: BUCKET,
        Body: fs.readFileSync(localImage),
        Key: imageRemoteName
      })
      .promise()
      .then((respo) => {
        let imageUrl = `https://moodvies.s3.amazonaws.com/${imageRemoteName}`;
        fs.unlink(`${DIR}/${data[0].originalname}`,(erro)=>{})

       ResponseData.push(imageUrl)
       if(ResponseData.length == data.length)
       {
         response.status     = 200;
         response.data.image = ResponseData;
         cb(null, response);
       }


      })
      .catch((error) => {
        cb(error);
      })

       })

      } else {

       response.status = 400;
       response.data = [];
       response.message = "File not received";
       cb(null,response);
      }
    }

  }


async function updateAdminDetails(req,res,cb) {

        const { name , email , password } = req.body;
        let token = jwt.verify(req.headers['authorization'], secretKey)
        let response = {
                        status : 200,
                        data : {},
                        message : ''
                }

        try {
                var admin = await Models.AdminCollection.findById(token._id);

                if (!!name) {
                     admin.name = name;
                }

                if (!!email) {
                     admin.email = email;
                }

                if (!!password) {
                     admin.password = bcrypt.hashSync(password, saltRounds);
                }

                admin.save((error) => {

                        if (error) {
                        response.status  = 400;
                        response.message = error.message;
                        res.json(response);
                        } else {
                        response.status  = 200;
                        response.message = "profile has been updated successfully .";
                        res.json(response);
                        }

                });


        }
        catch(error){
                console.log(error);
                response.status = 401;
                response.message = "Something went wrong"
                res.json(response)
        }

       //  console.log(req.body);

}

async function getAdminDetails(req,res,cb) {

     let token = jwt.verify(req.headers['authorization'], secretKey)
     let response = {
                status : 200,
                data : {},
                message : ''
        }

       try {
                var AllUsers = await Models.AdminCollection.findById(token._id);
                response.status  = 200;
                response.data = { email : AllUsers.email , name :AllUsers.name };
                response.message = "please check details .";
                res.json(response);
        }
        catch(error){
                console.log(error);
                response.status = 401;
                response.message = "Something went wrong"
                res.json(response)
        }



}

async function getAllCount(req,res,cb) {

        let response = {
                status : 200,
                data : {},
                message : ''
        }

        try {

                var AllUsers = await Models.UserCollection.find().countDocuments();
                var AllMovies = await Models.MovieCollection.find().countDocuments();

                response.status  = 200;
                response.data = { total_user: AllUsers , total_movies: AllMovies  }
                response.message = "please check all counts .";
                res.json(response);


        }
        catch(error){
                console.log(error);
                response.status = 401;
                response.message = "Something went wrong"
                res.json(response)
        }
}


async function adminLogin(req,res,cb){

    let { email, password } = req.body;
    let response = {
        status : 200,
        data : {},
        message : ''
    }

    try {

        const user = await Models.AdminCollection.findOne({ email: email});
            if (!user) {

                response.status  = 400;
                response.message = "Not a valid email address .";
                res.json(response);

            }
             let isMatch = bcrypt.compareSync(password, user.password);

            if (isMatch != true) {
                    response.status  = 400;
                    response.message = "Not a valid password address .";
                    res.json(response);
            }

            dataToSend =  jwt.sign({ _id: user._id  }, secretKey);
            response.status  = 200;
            response.data = { token: dataToSend }
            response.message = "LOGGED IN SUCCESSFULLY .";
            res.json(response);


    }
    catch(error){
        console.log(error);
        response.status = 401;
        response.message = "Something went wrong"
        res.json(response)
    }

}

async function getUserListing(req,res,cb) {
        const { currentPage , limit , offset } = req.params
        let response = {
                status : 200,
                data : [],
                message : ''
            }

        const options = {
              offset:offset,
              page: currentPage == 0 ? 1 : currentPage ,
              limit: limit
            };

         try {


            const user = await Models.UserCollection.paginate({},options);
            if (!user) {

                    response.status = 400;
                    response.message = " Sorry user not found . ";
                    res.json(response);

            } else {

                    response.status = 400;
                    response.data = user;
                    response.message = "Please check all list";
                    res.json(response);

            }

         }
         catch(error){
                    console.log(error);
                    response.status = 400;
                    response.message = "Something went wrong"
                    res.json(response)

         }

}

async function getMoviesListing(req,res,cb) {

       const { currentPage , limit , offset } = req.params
        let response = {
                status : 200,
                data : {},
                message : ''
            }

        const options = {
              offset:offset,
              page: currentPage == 0 ? 1 : currentPage ,
              limit: limit
            };

        try {

            const user = await Models.MovieCollection.paginate({},options);
            if (!user) {

                    response.status = 400;
                    response.message = " Sorry movies not found . ";
                    res.json(response);

            } else {

                    response.status = 400;
                    response.data = user;
                    response.message = "Please check all movies";
                    res.json(response);

            }

         }
         catch(error){
            response.status = 400;
            response.message = "Something went wrong"
            res.json(response)
         }

}

