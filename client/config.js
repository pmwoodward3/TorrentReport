module.exports = {
  version: {
    number: '0.1',
    text: 'ALPHA ',
    name() {
      return `${this.text}${this.number}`;
    },
  },
};
