const express  = require('express');
const router   = express.Router();
const { admin } = require('../services');
const utils    = require('../utils/common_function');
const multer   = require("multer");
const path     = require("path");

const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

let upload = multer({ storage: storage });


router.post('/admin-login', admin.adminLogin);
router.get('/get-user/:offset/:limit/:currentPage', utils.verifyAdmin,admin.getUserListing);
router.get('/get-movies/:offset/:limit/:currentPage', utils.verifyAdmin, admin.getMoviesListing);
router.get('/dashboard',utils.verifyAdmin, admin.getAllCount);
router.get('/get-admin-details',utils.verifyAdmin, admin.getAdminDetails);
router.post('/update-admin-details',utils.verifyAdmin, admin.updateAdminDetails);
router.post('/upload',utils.verifyAdmin,upload.any("photo"),admin.upload);
router.post('/import-csv',utils.verifyAdmin,admin.importCsvFile);


module.exports = router;
