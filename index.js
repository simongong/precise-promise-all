'use strict';

let sequential = (promiseTasks) => {
  let result = {resolved: {}, rejected: {}};
  return new Promise((resolve, reject) => {
    let status = Promise.resolve();
    promiseTasks.forEach((promiseTask, index) => {
      status = status.then(promiseTask)
      .then((data) => {
        result.resolved[index] = data;
      })
      .catch((err) => {
        result.rejected[index] = err.toString();
      });
    });
    status.then(() => resolve(result));
  });
};

let parallel = (promiseTasks) => {
  let result = {resolved: {}, rejected: {}};
  let taskResults = [];
  promiseTasks.forEach((promiseTask, index) => {
    taskResults.push(
      new Promise((resolve, reject) => {
        promiseTask()
        .then((data) => {
          result.resolved[index] = data;
          resolve();
        })
        .catch((err) => {
          result.rejected[index] = err.toString();
          resolve();  // We cannot reject here due to fail-fast behaviour of `Promise.all()`
        });
      })
    );
  });

  return Promise.all(taskResults).then(() => Promise.resolve(result));
};

module.exports = {parallel, sequential};
