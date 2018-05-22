const delay = require('./delay');

const factoryFuncArr = function factoryFuncArr(dataArray, funcToCall, delayTime = 0) {
  return dataArray.map(item => () => delay(funcToCall, item, delayTime));
}; // one minute delay between requests
// const factoryFuncArr = (array, funcToCall) => array.map(item => () => funcToCall(item));

const serializedPromiseArr = funcArr =>
  funcArr.reduce(
    (promise, currFunc) =>
      promise.then(result => currFunc().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]),
  );

const sequentialPromise = (dataArr, func, delayTime = 0) =>
  serializedPromiseArr(factoryFuncArr(dataArr, func, delayTime));

module.exports = sequentialPromise;
