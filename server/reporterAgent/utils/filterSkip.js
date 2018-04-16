const filterSkips = arrOfStuff => Array.from(arrOfStuff).filter(group => !group.skip);

module.exports = filterSkips;
