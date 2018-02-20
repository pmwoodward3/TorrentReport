const messagesArr = [
  'is it me? or is it a bit chilly in here?',
  'packing my belongings',
  'does this make my load look big?',
  'half to the moon already',
  'bathroom break',
  "building the Derek Zoolander Center For Kids Who Can't Read Good And Wanna Learn To Do Other Stuff Good Too",
  "Sorry, Maury. I'm not a gymnast. -Derek Zoolander",
  "A eugoogalizor, one who speaks at funerals. Or did you think I'd be too stupid to know what a eugoogoly was? -Derek Zoolander",
];

const randomNumber = () => {
  const min = 0;
  const max = messagesArr.length - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default () => messagesArr[randomNumber()];
