var express = require('express');
var router = express.Router();
var {
  dummy,
  log
} = require('./common');
var {
  _,
  moment,
  axios
} = require('./npm_modules');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/:category/list/:page', function (req, res, next) {
  console.log(req.params);
  console.log(req.params.category);

  let body = dummy.listPage(req.params.category);
  let pageName = '';

  if (req.params.category === 'movie') {
    pageName = 'movie';

    axios.get(`https://yts.tl/api/v2/list_movies.json?limit=10`)
      .then(function (response) {
        let data = response.data;

        if(data.status === 'ok'){
          log(data.data);
          body.movies = data.data.movies;
          body.pageName = pageName;
          res.render('Pages/Category/list', body);
        }
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  if (req.params.category === 'concert') {
    pageName = 'concert'

  }
  if (req.params.category === 'expo') {
    pageName = 'exhibition'

  }

});



module.exports = router;
