function createOverload(){
  let map = new Map()
  function overload(...args){
    console.log(this)
    let key = args.map(item=>typeof item).join(',')
    if(map.get(key)){
      // map.get(key).apply(this,args)
      map.get(key)(...args)
    }else{
      throw new Error('no match')
    }

  }
  overload.addImpl = function(...args){
    let fn = args.pop()
    if(typeof fn !== 'function'){
      return
    }else{
      let key = args.join(',')
      map.set(key,fn)
    }
  }

  return overload
}

export default createOverload