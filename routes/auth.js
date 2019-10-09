var express = require('express');
var router = express.Router();
var {Axios} = require('./common');
var {wrap} = require('./middlewares');
 



/**
 * ROUTER: login
 */
router.route('/login')
.get( wrap( (req, res, next) => {
  res.render('Pages/Auth/login', { title: 'login' });
}))
.post(wrap((req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
  let email = req.body.email;
  let password = req.body.password;

  let loginConfig = {
    url: '/auth/login',
    data: {
      username: email,
      password: password
    },
    method: 'POST'
  };
  Axios(loginConfig, (response) => {
    let data = response.data;
    console.log(data);
    if(data.result === 1){
      // 로그인 성공시

      req.session.user = data;
      console.log(req.session);
      res.redirect('/');
      //라우터주소
    } else if(data.result === 2){
      //둘중 하나 틀렸을 때

    } else {
      //둘다 틀렸을때

    }
  })

}) )

/**
 * ROUTER: logout
 */
router.route('/logout')
.get( wrap( (req, res, next) => {
  if (req.session) {
    console.log('로그아웃 처리');
    req.session.destroy(function (err) {
        if (err) {
          console.log('세션 삭제시 에러');
          return;
        }
        console.log('세션 삭제 성공');
        res.redirect('/')
      }
    );
  } else {
    console.log('로긴 안되어 있음');
  }

}))

router.get('/signup', wrap(async (req, res, next) => {
  res.render('Pages/Auth/signup', { title: 'Express' });
}))
  


module.exports = router;
