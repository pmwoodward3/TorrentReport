const randomNumber = require('./randomNumber');
const { RALogger } = require('../../logging');

const delay = (func, value, time) =>
  new Promise((resolveDelay, rejectDelay) => {
    // add random time between 1 and 60 seconds to delay
    const randomTime = !time ? 0 : time + randomNumber(1000, 60000);
    RALogger.verbose(` == delay set == ${time} ms == value: ${value} == random time: ${randomTime}`);
    setTimeout(() => {
      try {
        RALogger.verbose(` == delay resolve == ${time} ms == value: ${value}  == random time: ${randomTime}`);
        resolveDelay(func(value));
      } catch (err) {
        RALogger.verbose(` == delay reject == ${time} ms == value: ${value}  == random time: ${randomTime}`);
        rejectDelay(err);
      }
    }, randomTime);
  });

module.exports = delay;
