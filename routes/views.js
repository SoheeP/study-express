var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {

  res.render('Pages/ViewPages/about', { pageName: 'About' });
});


router.get('/faq', function(req, res, next) {
  let body = {};
  let faqData = [];
  for(let i = 0; i < 10 ; i = i+1){
    faqData.push({
      id:i,
      title: `Collapsible Group Item #${i+1}`,
      body: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.`
    })
  };
  body.pageName = 'FAQ';
  body.faqData = faqData;
  res.render('Pages/ViewPages/faq', body);

});
module.exports = router;
