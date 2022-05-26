const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = 'secret007';
const Model = require('../models');
const mongoose = require("mongoose");

exports.verifyAdmin = verifyAdmin;

async function verifyAdmin(req, res, next) {

      let bearerToken = req.headers['authorization']
      let response = {
        status: 200,
        data: {},
        message: ""
      }


      try {
        if (req.headers.authorization) {
            let token = req.headers.authorization;
            if (token.startsWith('Bearer')) {
                token = token.substr('Bearer'.length + 1)
            }
            const admin = await jwt.verify(token,secretKey);
            // console.log(admin._id);
            if (!admin) {

                response.status = 400
                response.message = 'Not a valid token';
                res.json(response)

                
            }
            const userData = await Model.AdminCollection.findOne({ _id: mongoose.Types.ObjectId(admin._id) }).lean().exec();
            if (userData) {
                req.user = userData;
                next();
            } else {

                response.status = 400
                response.message = 'Not a valid User';
                res.json(response);
            }
        }
        else {

                response.status = 400
                response.message = 'Token is required';
                res.json(response);
                
        }
    } catch (error) {
                // console.log(error);
                response.status = 400
                response.message = error.message;
                res.json(response);
    }

}

