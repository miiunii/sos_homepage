var express = require('express');
var router = express.Router();
const axios = require('axios');
const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('/Users/corgi/Desktop/sos_homepage/config/awsconfig.json');
//const config = require('/root/sos_homepage/config/awsconfig.json');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
new AWS.Config({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region
});


// cors 허용
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.session.login) {
    let { organNum, buildingName } = req.query;

    req.session.buildingNum = organNum

    axios.post('https://lgri839rll.execute-api.ap-northeast-2.amazonaws.com/complete/building/machines/get', {
      building: buildingName,
      organNum: Number(organNum)
    })
      .then((result) => {
        if (result.data.statusCode == 200) {
          res.render('devices', {
            msg: "성공",
            data: JSON.stringify(result.data.body)
          })
        }
        else {
          res.render('devices', {
            msg: "오류",
            data: JSON.stringify(result.data.errorMessage)
          })
        }
      })
      .catch((error) => {
        console.log('get devices list error\n', error);
        res.render('devices', {
          msg: "에러",
          data: error
        })
      })
  }
  else {
    res.redirect('/login');
  }
});

/* Get device data */
router.post('/deviceData', async (req, res, next) => {

  async function getS3Data(organNum, buildingNum, deviceNum) {
    return new Promise((resolve, reject) => {
      let pictureList = [];

      s3.listObjectsV2(
        {
          Bucket: "sos-homepage-s3",
          Prefix: organNum + "/" + buildingNum + "/" + deviceNum
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          else {
            data.Contents.forEach((content) => {
              pictureList.push(content.Key);
            });
            resolve(pictureList);
          }
        });
    });
  };

  let pictures = await getS3Data(String(req.session.organNum), req.session.buildingNum, req.body.deviceNum);

  axios.post('https://lgri839rll.execute-api.ap-northeast-2.amazonaws.com/complete/building/machines/detail', {
    device: decodeURIComponent(req.body.device),
    deviceNum: Number(req.body.deviceNum)
  })
    .then((result) => {
      if (result.data.statusCode == 200) {
        res.json({
          data: result.data.body,
          img: pictures,
          msg: "성공"
        })
      }
      else {
        res.json({
          data: result.data.errorMessage,
          msg: "실패"
        })
      }
    })
    .catch((error) => {
      console.log('get dvice data error\n', error);
      res.json({
        data: error,
        msg: "에러"
      })
    })

});

/* Updatae device data */
router.post('/updateDate', (req,res, next) => {
  axios.post(' https://lgri839rll.execute-api.ap-northeast-2.amazonaws.com/complete/building/machines/update', {
    device: req.body.device,
    deviceNum: Number(req.body.deviceNum),
    deviceCapacity: req.body.deviceCapacity,
    deviceFunction: req.body.deviceFunction,
    installCompany: req.body.installCompany,
    installContact: req.body.installContact,
    deviceLocation: req.body.deviceLocation,
    deviceName: req.body.deviceName,
    deviceSize: req.body.deviceSize,
    deviceTexture: req.body.deviceTexture,
    deviceType: req.body.deviceType
  })
  .then((result) => {
    if(result.status == 204) {
      res.json({
        msg: "성공"
      })
    }
    else {
      res.json({
        msg: "실패"
      })
    }
  })
  .catch((error) => {
    console.log('update device data error\n', error);
    res.json({
      msg: "에러"
    })
  })
});

module.exports = router;
