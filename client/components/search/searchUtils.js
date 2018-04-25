import _ from 'lodash';

const searchWithinArray = (arr, target) => {
  const cleanTarget = target.trim().toLowerCase();
  if (!cleanTarget) return arr;
  return arr.filter(item => _.includes(item.name.toLowerCase(), cleanTarget));
};

module.exports = { searchWithinArray };
