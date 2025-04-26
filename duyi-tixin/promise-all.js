let arr = [1,2,3,4,5,Promise.resolve(6)]

Promise.all(arr).then((res)=>{
  console.log(res)
})

Promise.myall = (params)=>{
    if(typeof(params)!== 'object' || params === null){
      return params
    }
    let reo = null
    let rej = null
    let p = new Promise((resolve,reject)=>{
      reo = resolve
      rej = reject
    })
    let index = 0
    let result = []
    for(let item of params){
       const _index = index
       index ++
       Promise.resolve(item).then((res)=>{
         result[_index] = res
         index--
         if(index === 0){
          reo(result)
         }
       },(err)=>{
        rej(err)
       })
    }
    if(index === 0){
      reo(params)
    }
    return p
}

Promise.myall([]).then((res)=>{
  console.log('myall',res)
})