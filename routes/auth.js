var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('Pages/Auth/login', { title: 'login' });
});

router.get('/signup', function(req, res, next) {
  res.render('Pages/Auth/signup', { title: 'Express' });
})
  
router.route('/user/out')
.get(function(req, res, next) {
  res.render('Pages/Auth/user_withdrawal', { title: 'Express' });
});

module.exports = router;
