var express = require('express');
var router = express.Router();
var {
  Axios
} = require('./common');
var {
  wrap
} = require('./middlewares');





/**
 * ROUTER: login
 */
router.route('/login')
  .get(wrap((req, res, next) => {
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
        email: email,
        password: password
      },
      method: 'POST'
    };
    Axios(loginConfig, (response) => {
      let data = response.data;
      console.log(data);
      if (data.result === 1) {
        // 로그인 성공시

        req.session.user = data;
        console.log(req.session);
        res.redirect('/');
        //라우터주소
      } else if (data.result === 2) {
        //둘중 하나 틀렸을 때 
        res.redirect('/auth/login')

      } else {
        //둘다 틀렸을때

      }
    })

  }))

/**
 * ROUTER: logout
 */
router.route('/logout')
  .get(wrap((req, res, next) => {
    if (req.session) {
      console.log('로그아웃 처리');
      req.session.destroy(function (err) {
        if (err) {
          console.log('세션 삭제시 에러');
          return;
        }
        console.log('세션 삭제 성공');
        res.redirect('/')
      });
    } else {
      console.log('로긴 안되어 있음');
    }

  }))

/**
 * ROUTER: signup
 */
router.route('/signup')
  .get(wrap(async (req, res, next) => {
    res.render('Pages/Auth/signup', {
      title: 'Express'
    });
  }))
  .post(wrap(async (req, res, next) => {
    let email = req.body.email;
    let verification = req.body.verification;
    let password = req.body.password;
    let username = req.body.username;
    let phone = req.body.phone;


    const signupConfig = {
      url: '/auth/signup',
      method: 'post',
      data: {
        email: email,
        verification: 1,
        password: password,
        username: username,
        phone: phone
      }
    };
    Axios(signupConfig, function (response) {
      let { data } = response;
      console.log(data);
      if(data.result === 1){
        res.json({result: 1});
      } else if(data.result === 4){
        res.json({ result: 4 });
      } else {
        res.json({result: 2});
      }
    })
  }))



module.exports = router;
