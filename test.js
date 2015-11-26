'use strict'

let PrecisePromiseAll = require('./index.js');
var should = require('should');

let promiseTasks = [];

before(() => {
  let timoutPromise = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (ms > 400) {
          return reject(new Error('timeout'));
        } else {
          resolve();
        }
      }, ms);
    });
  };

  // Add tasks
  promiseTasks.push(timoutPromise.bind(null, 100));
  promiseTasks.push(timoutPromise.bind(null, 200));
  promiseTasks.push(timoutPromise.bind(null, 300));
  promiseTasks.push(timoutPromise.bind(null, 400));
  promiseTasks.push(timoutPromise.bind(null, 500)); // will be rejected
});

describe('PrecisePromiseAll', () => {
  it('in sequential', (done) => {
    PrecisePromiseAll.sequential(promiseTasks)
    .then((result) => {
      Object.keys(result.resolved).length.should.eql(4);
      Object.keys(result.rejected).length.should.eql(1);
      Object.keys(result.rejected).forEach((index) => {
        result.rejected[index].should.be.Function;
      });
      done();
    })
    .catch(function(err) {
      console.log(err.toString());
      done();
    });
  });

  it('in parallel', (done) => {
    PrecisePromiseAll.parallel(promiseTasks)
    .then((result) => {
      Object.keys(result.resolved).length.should.eql(4);
      Object.keys(result.rejected).length.should.eql(1);
      Object.keys(result.rejected).forEach((index) => {
        result.rejected[index].should.be.Function;
      });
      done();
    })
    .catch(function(err) {
      console.log(err.toString());
      done();
    });
  });
});
