const expect = require('chai').expect;
const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the corret message object', () => {
    let from = 'Jacob';
    let text = 'Hello';
    let messageObject = generateMessage(from, text);
    expect(messageObject).to.include({from, text});
    expect(messageObject.createdAt).to.be.a('number');
  })
})