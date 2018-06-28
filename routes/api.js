var express = require('express');
var router = express.Router();

let overrideProcessPayment = false;
let overrideProcessPaymentValue = false;

router.get('/', function(req, res, next) {
  let response = {
    "_links" : [
      {
        "uri" : "/check"
      }
    ]
  };
  res.send(response);
});

let handlePayment = function() {
  let result = Math.random() >= 0.1;
  if (overrideProcessPayment) {
    result = overrideProcessPaymentValue;
  }
  let response = {
    "data" : {
      "validity" : result,
      "overrideProcessPaymentEnabled" : overrideProcessPayment
    }
  };
  return response;
};

// keeping for legacy
router.get('/check', function(req, res, next){
  let response = handlePayment();
  res.send(response);
});

router.get('/payment/process', function(req, res, next){
  let response = handlePayment();
  res.send(response);
});

// end point to set response
router.get('/payment/overrideProcessResult/enable/:value', function(req, res, next){
  overrideProcessPayment = true;
  overrideProcessPaymentValue = Boolean(Number(req.params.value));
  let response = {
    "overrideProcessPayment" : overrideProcessPayment,
    "overrideProcessPaymentValue" : overrideProcessPaymentValue
  };
  res.send(response);
});

router.get('/payment/overrideProcessResult/disable/', function(req, res, next){
  overrideProcessPayment = false;
  let response = {
    "overrideProcessPayment" : overrideProcessPayment
  };
  res.send(response);
});

module.exports = router;
