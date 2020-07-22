//封装，使异步方法返回promise

const promise = function(func){
  return function(params ={}){
    return new Promise((resolve,reject) =>{
      const args = Object.assign(params,{
        success:(res) =>{
          resolve(res);
        },
        fail:(error) => {
            reject(error);
        }
      });
      func(args)
    });
  }
}

export{
  promise
}
