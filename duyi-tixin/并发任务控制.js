function delay(durtion){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve()
    },durtion)
  })
}

class SuperTask {
   constructor(){
     this.tasks = []
     this.onTasks = 0
   }
   add(task){
    return new Promise((resolve)=>{
      this.tasks.push({
        task,
        resolve
      })
      this.run()
    })
   }
   run(){
     if(this.onTasks >= 2) return
     if(this.tasks.length === 0 ) return
     let item = this.tasks.shift()
     this.onTasks++
      item.task().then(()=>{
        this.onTasks--
        item.resolve()
        this.run()
      })
   }

}

const superTask = new SuperTask()

function addTask(time,name){
   superTask.add(() => delay(time)).then(()=>{
     console.log('任务' + name + '完成！！！')
   })
}

addTask(10000,1) //10000ms后 输出任务1完成
addTask(5000,2) //5000ms后 输出任务2完成
addTask(3000,3) //8000ms后 输出任务3完成
addTask(4000,4) //12000ms后 输出任务4完成
addTask(5000,5) //15000ms后 输出任务5完成