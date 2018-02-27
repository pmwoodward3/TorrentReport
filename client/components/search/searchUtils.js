const searchWithinArray = (arr, target) => {
  if (!target.trim().length) {
    console.log('empty search');
    return arr;
  }
  const results = [];
  const targetItems = target
    .trim()
    .split(' ')
    .map(item => item.toLowerCase());
  console.log('targetItems', targetItems);
  const targetRegEx = targetItems
    .map((item, index) => {
      const pre = '(';
      const post = ')';
      if (index === targetItems.length - 1) return `${pre}${item}${post}`;
      const delimit = '.+?';
      return `${pre}${item}${post}${delimit}`;
    })
    .join('');
  const regExString = `/${targetRegEx}/ig`;
  const searchRegEx = new RegExp(regExString);
  console.log('regExString', regExString);
  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i];
    const currentName = currentItem.name.toLowerCase();
    console.log('-->', searchRegEx.exec(currentName));
    if (searchRegEx.exec(currentName)) {
      results.push(arr[i]);
    }
  }

  console.log('results', results);
  return results;
};

module.exports = { searchWithinArray };
