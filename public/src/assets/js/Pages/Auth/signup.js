let signupForm = s0.elm('#signupForm');
let email           = s0.elm("#email");
let verification    = s0.elm("#verification");
let password        = s0.elm("#password");
let passwordConfirm = s0.elm("#passwordConfirm");
let username        = s0.elm("#username");
let phone           = s0.elm("#phone");

signupForm.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('submiiit');



  const signupConfig = {
    //라우터 주소 
    url: '/auth/signup',
    method: 'post',
    data: {
      email: email.value,
      password: password.value,
      username: username.value,
      phone: phone.value,
      verification: verification.value
    }
  };
  axios(signupConfig).then(function(response){
    let {data} = response;
    console.log(data);
    if(data.result === 1){
      alert('회원가입을 축하합니다.')
      window.location.href = '/auth/login';
    } else if(data.result === 4){
      alert('이메일이 중복되었습니다.')
    } else {
      alert('입력하신 사항을 확인해주세요.')
    }
  })

})