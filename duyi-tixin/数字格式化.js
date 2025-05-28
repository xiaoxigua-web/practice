let str = '1000000000'

let numstr = str.replace(/(?=(\d{3})+$)/g,',')
console.log(numstr)