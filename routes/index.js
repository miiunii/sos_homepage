var express = require('express');
var router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
AWS.config.loadFromPath('/Users/corgi/Desktop/sos_homepage/config/awsconfig.json');
//AWS.config.loadFromPath('/root/sos_homepage/config/awsconfig.json');
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient();

const uploadOption = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'sos-homepage-s3/test',
      key: (req, file, cb) => {
          console.log(file)
          cb(null, file.originalname);
      },
      acl: 'public-read-write'
  })
});

const getObjectParam = {
  Bucket: "sos-homepage-s3",
  Key: "default"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST IMAGE */
router.post('/postImg', uploadOption.single('img'), (req, res, next) => {
  console.log(req.file)
});

/* GET IMAGE*/
router.post('/list', (req, res, next) => {
  // let param = {
  //   Bucket: 'sos-homepage-s3'
  // }
  // const response = s3.listObjectsV2(param, (err, data) => {
  //   if (err) {
  //     console.log('err \n', err)
  //   }
  //   else {
  //     console.log('data \n', data)
  //   }
  // })
  // res.send(response)
  s3.getObject(getObjectParam, (err, data) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(data)
    }
  })

});

module.exports = router;
