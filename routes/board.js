const express = require('express');
const router = express.Router();
const {
  Axios,
  createSvgCaptcha,
  replaceAll,
  varifivationMailForm,
  dummy
} = require('./common');
const {
  wrap,
  isLoggedModal
} = require('./middlewares');

/* GET home page. */

// /board/free/list
// post : page :1


router.route('/free/list/:page')
  .get(wrap(async (req, res, next) => {
    const page = req.params.page;
    let body = {};
    body.pageName = 'Board';
    let boardListConfig = {
      url: `/board/free/list`,
      method: `post`,
      data: {
        page
      }
    }
    Axios(boardListConfig).then(({
      data
    }) => {
      if (data.result === 1) {
        console.log(data, 'gdgdg');
        Object.assign(body, data);
        res.render('Pages/Board/free_board', body);
      } else {
        body.title = "페이지 로딩에 문제가 발생하였습니다. 다시 시도해주세요.";
        body.ahref = "/";
        res.render('Common/Component/Modules/modal', body);
      }
    })
  }));


router.route('/free/write')
  .get(wrap(async (req, res, next) => {
    let body = {};
    console.log(req.session);
    body.pageName = 'Board Write';
    res.render('Pages/Board/free_board_write', body);
  }));


// ROUTER: board modify
// /board/free/modify
// userSeq, boardSeq, title, content
  router.route('/free/modify')
  .post(wrap(async (req, res, next) => {
    let body = {};
    console.log(req.session);
    body.pageName = 'Board Write';
    let { seq:userSeq } =  req.session.user;
    let { boardSeq, title, content} = req.body;
    console.log(req.body);
    console.log(userSeq);

    let boardModifyConfig = {
      url: `/board/free/modify`,
      method: 'post',
      data: {
        userSeq,
        boardSeq,
        title,
        content
      }
    }
    Axios(boardModifyConfig).then(({data})=>{
      console.log(data);
      if(data.result === 1){
        body.title = "수정되었습니다.";
        body.ahref = `/board/free/detail/view/${boardSeq}`;
        res.render('Common/Component/Modules/modal', body);
      } else {
        body.title = "문제가 발생하였습니다. 다시 시도해주세요.";
        body.ahref = "/board/free/list/1";
        res.render('Common/Component/Modules/modal', body);
      }
    })
  }));

// /board/free/delete
// boardSeq, userSeq
router.route('/free/delete')
  .post(wrap(async (req, res, next) => {
    let body = {};
    console.log(req.session);
    const { boardSeq } = req.body;
    const { seq:userSeq } = req.session.user;
    console.log(boardSeq, userSeq, '**********');
    body.pageName = 'Board Write';
    

    let boardDeleteConfig = {
      url: `/board/free/delete`,
      method: 'post',
      data: {
        userSeq,
        boardSeq,
      }
    }

    Axios(boardDeleteConfig).then(({data})=>{
      if(data.result === 1){
        body.title = "정상적으로 삭제되었습니다.";
        body.ahref = "/board/free/list/1";
        res.render('Common/Component/Modules/modal', body);
      } else {
        body.title = "문제가 발생하였습니다. 다시 시도해주세요.";
        body.ahref = "/board/free/list/1";
        res.render('Common/Component/Modules/modal', body);
      }
    })
  }));


// ROUTER: view board detail
// /board/free/detail/:boardSeq

router.route('/free/detail/:mode/:boardSeq')
  .get(wrap(async (req, res, next) => {
    let body = {};
    let boardSeq = req.params.boardSeq;
    body.pageName = 'Board Detail';
    body.detailMode = req.params.mode;
    let boardDetailConfig = {
      url: '/board/free/detail',
      method: 'post',
      data: {
        boardSeq
      }
    }
    console.log(boardDetailConfig);
    Axios(boardDetailConfig).then(({
      data
    }) => {
      if (data.result === 1) {
        Object.assign(body, data);
        console.log(body);
        res.render('Pages/Board/free_board_detail', body);
      } else {
        body.title = "문제가 발생하였습니다. 다시 시도해주세요.";
        body.ahref = "/board/free/list/1";
        res.render('Common/Component/Modules/modal', body);
      }
    })
  }));


router.route('/free/write/upload')
  .post(isLoggedModal, wrap(async (req, res, next) => {
    let body = {};
    const {
      seq: userSeq,
      username: author
    } = req.session.user;
    const {
      title,
      content
    } = req.body
    console.log(req.body);
    body.pageName = 'Board Write';
    let boardUploadConfig = {
      url: '/board/free/upload',
      method: 'post',
      data: {
        userSeq,
        author,
        title,
        content
      }
    }
    Axios(boardUploadConfig).then(({
      data
    }) => {
      if (data.result === 1) {
        body.title = "등록되었습니다.";
        body.ahref = "/board/free/list/1";
        res.render('Common/Component/Modules/modal', body);
      } else {
        body.title = "문제가 발생하였습니다. 다시 시도해주세요.";
        body.ahref = "/board/free/write";
        res.render('Common/Component/Modules/modal', body);
      }
    })




  }));

module.exports = router;
