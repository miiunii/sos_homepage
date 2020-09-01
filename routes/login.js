var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var config = require('/Users/corgi/Desktop/sos_homepage/config/awsconfig.json');
//var config = require('/root/sos_homepage/config/awsconfig.json');
AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});

//var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var docClient = new AWS.DynamoDB.DocumentClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* CHECK user data */
router.post('/loginProcess', async(req, res, next) => {
  try{
    let queryData = await getUserData(req.body.id);
    console.log(queryData)
    res.json({
      msg: "success"
    })
  }
  catch (err) {
    throw err
  }
})

/* 로그인 query */
async function getUserData(id) {
  return new Promise((resolve, reject) => {
    let params = {
      TableName: "login",
      Key: {
        "id": {S: id}
      }
    };
    
      docClient.get(params, (err, data) => {
      if (err) {
        console.log('dynamodb get item error')
        throw err
      }
      else {
        resolve(data)
      }
    });

  })
}

module.exports = router;
