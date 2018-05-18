/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');

const User = db.model('user');

describe('User model', () => {
  // beforeEach(() => db.sync({ force: true }));

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      // beforeEach();

      it('returns true if the password is correct', async () => {
        let cody;
        await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
        }).then((user) => {
          cody = user;
        });
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', async () => {
        let cody2;
        await User.create({
          email: 'cod2y@puppybook.com',
          password: 'b2ones',
        }).then((user) => {
          cody2 = user;
        });
        expect(cody2.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
