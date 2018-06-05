module.exports = {
  version: {
    number: '0.2',
    text: 'ALPHA ',
    name() {
      return `${this.text}${this.number}`;
    },
  },
};
