# precise-promise-all

[![npm version](https://badge.fury.io/js/precise-promise-all.svg)](https://badge.fury.io/js/precise-promise-all)

> `Promise.all` is rejected if one of the elements is rejected and Promise.all fails fast: If you have four promises which resolve after a timeout, and one rejects immediately, then Promise.all rejects immediately.

_from [Promise All - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)_

There are some cases which `Promise.all` is not applicable for:

- Not all tasks are ensured to get executed due to `fast-fail`.
- You don't know the resolved values in detail, only the overall result
- You don't know rejected tasks which you may want to process afterwards.

Therefore, I made this `precise-promise-all`, which will

- execute **all** the promise tasks
- return the precise resolved values **and** rejected promises as well.

## Install

```
$ npm install --save precise-promise-all
```


## Usage

`precise-promise-all` provides two APIs which work in different way but yield the same result:

- `parallel(iterable)`
- `sequential(iterable)`

#### Example

```js
const PrecisePromiseAll = require('precise-promise-all');

// iterable is an array of `() => somethingThatCreatesAPromise()`
PrecisePromiseAll.parallel(iterable)
.then((result) => {
    // result consists of {resolved, rejected} in which
    // resolved looks like {index1: resolvedValue1, ...} and
    // rejected looks like {index2: iterable[index2]}.
    // So you can consume values of resolved promises and
    // hanlde those rejected promises afterwards
});
```

## License

[MIT](LICENSE)
