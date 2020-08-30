var express = require('express');
var router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
const s3 = new AWS.S3();
AWS.config.loadFromPath('/Users/corgi/Desktop/sos_homepage/config/awsconfig.json');
// AWS.config.loadFromPath('/root/sos_homepage/config/awsconfig.json');

const upload = multer({
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/postImg', upload.single('img'), (req, res, next) => {
  console.log(req.file)
})

router.post('/list', (req, res, next) => {
  const response = s3.listObjectsV2({
    Bucket: 'test'
  }, (err, data) => {
    if (err) {
      console.log(err)
    }
    else {
      return data
    }
  })
  res.send(response)
})

module.exports = router;
