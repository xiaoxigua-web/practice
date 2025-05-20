const add = (x, y) => x + y
const add5 = (x) => x + 5
const multiply10 = (x) => x * 10

const compose = (...fns) => {
  return fns.reduce((a, b) => {
    return (...args) => a(b(...args))
  })
}

const f = compose(add5, multiply10, add)
console.log(f(3,3))