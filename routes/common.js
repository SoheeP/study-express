var dummy = require('./../dummy');
var {_, moment, axios, util} = require('./npm_modules');

/**
 * 
 */
function log(text){
  console.log(util.inspect(text, false, null, true ));
}

function listAxios(config, callback){
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

exports.dummy     = dummy;
exports.log       = log;
exports.listAxios = listAxios