const expect = require('chai').expect;
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let number = 5;
    let boolean = true;
    let object = {};
    expect(isRealString(object)).to.equal(false);
    expect(isRealString(number)).to.equal(false);
    expect(isRealString(boolean)).to.equal(false);
  });

  it('should reject string with only spaces', () => {
    let spaces = '  ';
    expect(isRealString(spaces)).to.equal(false);
  });

  it('should allow string with non-space characters', () => {
    let words = ' john ';
    expect(isRealString(words)).to.equal(true);
  });
});