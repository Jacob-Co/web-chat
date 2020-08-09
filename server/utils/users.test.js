const expect = require('chai').expect;
const {Users} = require('./users');


describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jack',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Jen',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let nodeUsers = new Users();
    let user = {
      id: '123',
      name: 'Jacob',
      room: 'Node'
    }

    let resUser = nodeUsers.addUser(user.id, user.name, user.room);
    expect(nodeUsers.users).to.eql([user]);
  });

  it('should return name for node course', () => {
    let userList = users.getUserList('Node Course');
    expect(userList).to.eql(['Mike', 'Jen']);
  });

  it('should return name for react course', () => {
    let userList = users.getUserList('React Course');
    expect(userList).to.eql(['Jack']);
  });

  it('should remove a user given a correct id',() => {
    let chosenUser1 = users.getUser('1');
    let chosenUser2 = users.getUser('2');
    expect(chosenUser1).to.eql(users.users[0]);
    expect(chosenUser2).to.eql(users.users[1]);
  });

  it('should not remove user give an incorrect id', () => {
    let chosenUser1 = users.getUser('12');
    expect(chosenUser1).to.not.exist;
  });

  it('should find user given the correct id', () => {
    let userToBeRemoved = users.users[0];
    let chosenUser1 = users.removeUser('1');
    expect(chosenUser1).to.eql(userToBeRemoved);
    expect(users.users.length).to.equal(2);
    expect(users.users).to.not.include(userToBeRemoved);
  });

  it('should not find user given an incorrect id', () => {
    let chosenUser1 = users.removeUser('123');
    expect(chosenUser1).to.not.exist;
    expect(users.users.length).to.equal(3);
  })
});
