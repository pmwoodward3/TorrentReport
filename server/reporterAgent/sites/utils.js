const seedOrLeachFix = (rawResult) => {
  if (typeof rawResult === 'string') {
    const clean = rawResult.replace(',', '');
    return parseInt(clean, 10);
  }
  return parseInt(rawResult, 10);
};

const universalClean = (key, rawResult) => {
  let returnValue;
  switch (key) {
    case 'name': {
      returnValue = rawResult.replace(/\./g, ' ').trim();
      break;
    }
    case 'seed': {
      returnValue = seedOrLeachFix(rawResult);
      break;
    }
    case 'leech': {
      returnValue = seedOrLeachFix(rawResult);
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
