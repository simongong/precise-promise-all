'use strict';

// execute tasks in sequence
let sequential = (promiseTasks) => {
  let result = {resolved: {}, rejected: {}};

  return new Promise((resolve, reject) => {
    let status = Promise.resolve(); // start of the process chain

    promiseTasks.forEach((promiseTask, index) => {
      status = status.then(promiseTask)
      .then((data) => {
        result.resolved[index] = data;
      })
      .catch((err) => {
        result.rejected[index] = err.message;
      });
    });
    status.then(() => resolve(result));
  });
};

// execute tasks in parallel
let parallel = (promiseTasks) => {
  let result = {resolved: {}, rejected: {}};
  let taskResults = []; // an array of wrapped task

  promiseTasks.forEach((promiseTask, index) => {
    taskResults.push(
      // wrap task as a promise so we can get the result of the task
      new Promise((resolve, reject) => {
        promiseTask()
        .then((data) => {
          result.resolved[index] = data;
          resolve();
        })
        .catch((err) => {
          result.rejected[index] = err.toString();
          resolve();  // we cannot reject here due to fail-fast behaviour of `Promise.all()`
        });
      })
    );
  });
  // internally, `Promise.all` runs tasks in parallel
  return Promise.all(taskResults).then(() => Promise.resolve(result));
};

module.exports = {parallel, sequential};
