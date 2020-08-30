const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const path = require('path');
const s3 = new AWS.S3();
const img = require('./')
AWS.config.loadFromPath(__dirname + '/config/awsconfig.json');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'sos-homepage-s3/test',
        // key: (req, file, cb) => {
        //     const extension = path.extname(file.originalname);
        //     cb(null, Date.now().toString() + extension);
        // },
        key: (req, file, cb) => {
            console.log(file)
            cb(null, file.originalname);
        },
        acl: 'public-read-write'
    })
});