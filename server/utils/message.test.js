const expect = require('chai').expect;
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the corret message object', () => {
    let from = 'Jacob';
    let text = 'Hello';
    let messageObject = generateMessage(from, text);
    expect(messageObject).to.include({from, text});
    expect(messageObject.createdAt).to.be.a('number');
  })
})

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    let from = "Admin";
    let lat = "150";
    let lon = "350";
    let locationMessageObject = generateLocationMessage(from, lat, lon);
    expect(locationMessageObject).to.include({
      from,
      url: `https://google.com/maps?q=${lat},${lon}`
    });
    expect(locationMessageObject.createdAt).to.be.a('number');
  })
})