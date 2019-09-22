var dummy = require('./../dummy');
var {_, moment, axios, util} = require('./npm_modules');

function log(text){
  console.log(util.inspect(text, false, null, true ));
}

exports.dummy = dummy;
exports.log = log;