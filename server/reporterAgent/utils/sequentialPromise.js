const factoryFuncArr = (array, funcToCall) => array.map(item => () => funcToCall(item));

const serializedPromiseArr = funcArr =>
  funcArr.reduce(
    (promise, currFunc) =>
      promise.then(result => currFunc().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]),
  );

const sequentialPromise = (dataArr, func) => serializedPromiseArr(factoryFuncArr(dataArr, func));

module.exports = sequentialPromise;
