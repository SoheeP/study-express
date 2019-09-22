var express = require('express');
var {
  indexInfo
} = require('../dummy');
var router = express.Router();
var {
  dummy,
  log,
  listAxios
} = require('./common');
var {
  _,
  moment,
  axios
} = require('./npm_modules');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(indexInfo());
  res.render('index', {
    title: 'Express',
    pageName: 'Home'
  });
});

router.get('/:category/list/:page', function (req, res, next) {
  console.log(req.params);
  console.log(req.params.category);

  let body = {};
  let pageName = '', url;
  if (req.params.category === 'movie') {
    pageName = 'movie';
    url = 'https://yts.tl/api/v2/list_movies.json?limit=10';
  }
  if (req.params.category === 'concert') {
    pageName = 'concert';
    url = 'https://yts.tl/api/v2/list_movies.json?limit=2';

  }
  if (req.params.category === 'expo') {
    pageName = 'exhibition';
    url = 'https://yts.tl/api/v2/list_movies.json?limit=5';
  }

  let configObj = {
    method: 'get',
    url: url,
    body:body,
    res:res,
    pageName:pageName
  }
  listAxios(configObj,function(data){
    log(data.data);
    body.movies = data.data.movies;
  });

});

router.get('/:category/detail/:seq', function (req, res, next) {
  console.log(req.params, `detail params`);
  let body = {};
  let movie_seq = req.params.seq;
  let pageName = 'movie_detail';
  axios.get(`https://yts.tl/api/v2/movie_details.json?movie_id=${movie_seq}`)
    .then(function (response) {
      let data = response.data;

      if (data.status === 'ok') {
        log(data.data);
        body.movie = data.data.movie;
        body.pageName = pageName;
        res.render('Pages/Category/movie_detail', body);
      }

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  // https://yts.tl/api/v2/movie_details.json?movie_id

});

module.exports = router;
