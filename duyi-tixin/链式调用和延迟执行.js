function arrange(name) {
  let tasks = [];
  tasks.push(() => {
      console.log(name + ' is notified');
  });

  function wait(delay) {
      tasks.push(() => {
          return new Promise((resolve) => {
              setTimeout(() => {
                  resolve();
              }, delay * 1000);
          });
      });
      return this;
  }

  function do1() {
      tasks.push(() => {
          console.log('start to commit');
      });
      return this;
  }

  function waitFirst(delay) {
      tasks.unshift(() => {
          return new Promise((resolve) => {
              setTimeout(() => {
                  resolve();
              }, delay * 1000);
          });
      });
      return this;
  }

  function execute() {
      (async()=>{
        for (let task of tasks) {
              await task();
       }
      })()
      return this;
  }

  return {
      wait,
      do: do1,
      waitFirst,
      execute
  };
}

arrange('William')
  .wait(5)
  .do()
  .waitFirst(3)
  .execute();    