import createOverload from './overload.js'
const getUsers = createOverload()

getUsers.addImpl(()=>{
  console.log('查询所有用户')
})

const searchPage = (page,size = 10)=>{
  console.log('按照页码查询用户')
}

getUsers.addImpl('number',searchPage)
getUsers.addImpl('number','number',searchPage)

getUsers.addImpl('string',()=>{
  console.log('按照姓名查询用户')
})

getUsers()