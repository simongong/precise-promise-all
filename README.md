# precise-promise-all

> `Promise.all` is rejected if one of the elements is rejected and Promise.all fails fast: If you have four promises which resolve after a timeout, and one rejects immediately, then Promise.all rejects immediately.

_from [Promise All - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)_

What if you want all the promise tasks get executed even if one of them rejects somehow?

Furthure more, you may want to know sepecifically which task is rejected as well.

`precise-promise-all` will execute all the promise tasks with rejection ignored and return the precise resolved and rejected result.

## Install

```
$ npm install --save precise-promise-all
```


## Usage

`precise-promise-all` provides two APIs which work in different way but yield the same result:

- `PrecisePromiseAll.parallel`
- `PrecisePromiseAll.sequential`

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
    // hanlde those rejected promises once again
});
```

## License

[MIT](LICENSE)
