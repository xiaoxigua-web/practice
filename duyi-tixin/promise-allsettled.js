let arr = [1,Promise.reject('2')]

Promise.allSettled(arr).then((result)=>{
  console.log(result)
})

Promise.myallSettled = (params)=>{
  let res,rej;
  let p = new Promise((resolve,reject)=>{
      res = resolve
      rej = reject
  })
  let count = 0
  let result = []
  
  for(let item of params){
    let index = count
    count++
    Promise.resolve(item).then((data)=>{
      count--
      result[index] = { status: 'fulfilled', value: data }
      if(count === 0){
        res(result)
      }
    },(reson)=>{
      count--
      result[index] = { status: 'rejected', reson: reson }
      if(count === 0){
        res(result)
      }
    })
  }

  if(count === 0){
    res([])
  }
  return p
}

Promise.myallSettled(arr).then((result)=>{
  console.log('myallSettled',result)
})