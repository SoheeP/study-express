function indexInfo(){
  let arr = [];
  for(let i=0; i < 10 ; i++){
    arr.push(
      {
        name: '철수' + i,
        age: Math.floor(Math.random() * (5 + i)),
      }
    )
  }
  return arr;
}

exports.indexInfo = indexInfo;