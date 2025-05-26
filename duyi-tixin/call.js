function fn(...args){
   console.log(this)
   console.log(args)
}

fn.call({},1,2,3)

Function.prototype.myCall = function(ctx,...args){
   ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx)
   let key = Symbol()
   Object.defineProperty(ctx,key,{
    value:this,
    enumerable:false
   })
   let result =  ctx[key](...args)
   return result
}

Function.prototype.myApply = function(ctx,args){
   ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx)
   let key = Symbol()
   ctx[key] = this
   return ctx[key](...args)
}

fn.myCall({},[1,2,3])

Function.prototype.bind = function(ctx,...args){
  let fn = this
  return function(...params){
      let arg = [...args,...params]
      console.log('bind',this)
      return fn.myCall(Object(ctx),...arg)
  }
}

let fn2 = fn.bind({},1,2,3,4,5,6)
fn2()
