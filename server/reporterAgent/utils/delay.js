const { RALogger } = require('../../logging');

const delay = (func, value, time) =>
  new Promise((resolveDelay, rejectDelay) => {
    RALogger.verbose(` == delay set == ${time} ms == value: ${value} ==`);
    setTimeout(() => {
      try {
        RALogger.verbose(` == delay resolve == ${time} ms == value: ${value} ==`);
        resolveDelay(func(value));
      } catch (err) {
        RALogger.verbose(` == delay reject == ${time} ms == value: ${value} ==`);
        rejectDelay(err);
      }
    }, time);
  });

module.exports = delay;
