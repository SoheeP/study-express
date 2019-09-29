var dummy = require('./../dummy');
var {
  _,
  moment,
  axios,
  util
} = require('./npm_modules');

/**
 * 
 */
function log(text) {
  console.log(util.inspect(text, false, null, true));
}

function listAxios(config, callback) {
  axios(config)
    .then(function (response) {
      let data = response.data;

      if (data.status === 'ok') {
        callback(data)
        config.body.pageName = config.pageName;
        config.res.render('Pages/Category/list', config.body);
      }

    }).catch(function (error) {
      // handle error
      console.log(error);
    })
}

function Axios(config, callback) {
  const apiAddress = 'http://localhost:8081';
  config.url = apiAddress + config.url;
  return axios(config)
}



exports.dummy = dummy;
exports.log = log;
exports.listAxios = listAxios;
exports.Axios = Axios;