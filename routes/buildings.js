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
  if (req.session.login) {
    axios.post('https://lgri839rll.execute-api.ap-northeast-2.amazonaws.com/complete/building/buildings', {
      organNum: req.session.organNum,
      company: req.session.companyName
    })
    .then((result) => {
      if (result.data.statusCode == 200) {
        res.render('buildings', {
          data: JSON.stringify(result.data.body),
          msg: "성공"
        });
      }
      else {
        res.render('buildings', {
          data: JSON.stringify(result.data.errorMessage),
          msg: "실패"
        })
      }
    })
    .catch((error) => {
      console.log('get building list error\n', error);
      res.render('buildings', {
        data: error,
        msg: "에러"
      })
    });
  }
  else {
    res.redirect('/login');
  }
});

module.exports = router;
