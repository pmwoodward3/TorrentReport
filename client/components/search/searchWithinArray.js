import _ from 'lodash';

export default searchWithinArray = (arr, target) => {
  const cleanTarget = target
    ? target
      .trim()
      .toLowerCase()
    : '';
  if (!cleanTarget) 
    return arr;
  return Promise
    .resolve()
    .then(_ => arr.filter(item => _.includes(item.name.toLowerCase(), cleanTarget)));
}
