function createCancelTask(asyncTask){
  let cancel = ()=>{}
  return (...args)=>{
    return new Promise((resolve,reject)=>{
      cancel()
      cancel = ()=>{
        resolve = reject = ()=>{}
      }
      asyncTask(...args).then((res)=>{
        resolve(res)
      },(err)=>{
        reject(err)
      })
    })
  }
}