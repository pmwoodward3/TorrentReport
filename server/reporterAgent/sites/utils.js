const universalClean = (key, rawResult) => {
  let returnValue;
  switch (key) {
    case 'name': {
      returnValue = rawResult.replace(/\./g, ' ').trim();
      break;
    }
    case 'seed': {
      returnValue = parseInt(rawResult, 10);
      break;
    }
    case 'leach': {
      returnValue = parseInt(rawResult, 10);
      break;
    }
    default: {
      returnValue = rawResult;
      break;
    }
  }
  return returnValue;
};

module.exports = { universalClean };
