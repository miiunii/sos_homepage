var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
//AWS.config.loadFromPath('/Users/corgi/Desktop/sos_homepage/config/awsconfig.json');
//AWS.config.loadFromPath('/root/sos_homepage/config/awsconfig.json');
AWS.config.update({
  region: 'ap-northeast-2',
  //endpoint: 'http://localhost:3000/login'
  endpoint: 'http://13.125.0.37'
  //endpoint: 'http://172.31.47.65'
});
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

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
    
    dynamodb.getItem(params, (err, data) => {
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
