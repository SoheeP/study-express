var express = require('express');
var {
  indexInfo
} = require('../dummy');
var router = express.Router();
var {
  dummy,
  log,
  listAxios,
  Axios
} = require('./common');
var {
  _,
  moment,
  axios
} = require('./npm_modules');





/* GET home page. */
router.get('/', async function (req, res, next) {
  let limit = 10;
  let body = {};
  let axiosLikeConfig = {
    method: 'get',
    url: `/movie?limit=${limit}&sort_by=like_count`,
  };

  let axiosDownloadConfig = {
    method: 'get',
    url: `/movie?limit=${limit}&sort_by=download_count`,
  };

  let axiosRatingConfig = {
    method: 'get',
    url: `/movie?limit=${limit}&sort_by=rating`,
  };

  let axiosMainSlideConfig = {
    method: 'get',
    url: `/movie?limit=5&sort_by=date_added`,
  };


  await axios.all([
      Axios(axiosLikeConfig), Axios(axiosDownloadConfig), Axios(axiosRatingConfig), Axios(axiosMainSlideConfig)
    ])
    .then(axios.spread(function (like, download, rating, main) {
      body.categoryData = [{
          category: '좋아요 순.',
          movies: like.data.data.movies
        },
        {
          category: "다운로드 순",
          movies: download.data.data.movies
        },
        {
          category: '평점 순.',
          movies: rating.data.data.movies
        }
      ];
      body.mainSlideData = main.data.data.movies
    }));
  body.pageName = 'Home',
    res.render('index', body);


});

router.get('/:category/list/:page', function (req, res, next) {
  console.log(req.params);
  console.log(req.params.category);

  let body = {};
  let pageName = '',
    url;
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
    body: body,
    res: res,
    pageName: pageName
  }
  listAxios(configObj, function (data) {
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