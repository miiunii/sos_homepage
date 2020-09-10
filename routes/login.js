var express = require('express');
var router = express.Router();
const axios = require('axios');

// cors 허용
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* CHECK user data */
router.post('/loginProcess', async(req, res, next) => {
  try{
    axios.post('https://lgri839rll.execute-api.ap-northeast-2.amazonaws.com/complete/building/login', {
      id: req.body.id
    })
    .then((result) => {
      if(result.data.Item == undefined) {
        res.send('no data')
      }
      else {
        if (result.data.Item.password == req.body.password) {
          req.session.organNum = result.data.Item.organNum
          req.session.companyName = result.data.Item.company
          req.session.login = true
          res.send('success')
        }
        else {
          res.send('check again')
        }
      }
    })
    .catch((error) => {
      console.log('check user data error \n', error);
    })
  }
  catch (err) {
    throw err
  }
})

module.exports = router;
