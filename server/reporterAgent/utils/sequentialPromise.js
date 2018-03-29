const factoryFuncArr = (array, func) => array.map(item => () => func(item));

const serializedPromiseArr = funcArr =>
  funcArr.reduce(
    (promise, func) => promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]),
  );

const sequentialPromise = (dataArr, func) => serializedPromiseArr(factoryFuncArr(dataArr, func));

module.exports = sequentialPromise;
