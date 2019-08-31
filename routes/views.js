var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {

  res.render('Pages/ViewPages/about', { pageName: 'About' });
});

module.exports = router;
