var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/check', function(req, res, next){
  let result = Math.random() >= 0.1;
  let response = {
    "data" : {
      "validity" : result
    }
  };
  res.send(response);
});

module.exports = router;
