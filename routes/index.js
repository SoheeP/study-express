var express = require('express');
var {indexInfo} = require('../dummy');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(indexInfo());

  res.render('index', { title: 'Express' , pageName: 'Home'});
});

router.get('/b', function(req, res, next) {
  res.render('index', { title: 'Express b' });
});

module.exports = router;
