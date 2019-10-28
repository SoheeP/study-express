var express = require('express');
var router = express.Router();
var { Axios } = require('./common');

/* GET home page. */
router.get('/about', function(req, res, next) {

  res.render('Pages/ViewPages/about', { pageName: 'About' });
});


// get /faq/list
router.get('/faq', function(req, res, next) {
  let body = {};
  body.pageName = 'FAQ';
  
  let faqListConfig = {
    url: '/faq/list',
    method: 'get',
  }
  
  Axios(faqListConfig).then(({data})=>{
    if(data.result === 1){
      Object.assign(body, data)
      console.log(body);
      res.render('Pages/ViewPages/faq', body);
    } else {
      let modalConfig = {
        title: '오류가 발생하였습니다.',
        ahref: `/`
      }
      res.render('Common/Component/Modules/modal', modalConfig)
    }
  })
  
});
module.exports = router;
