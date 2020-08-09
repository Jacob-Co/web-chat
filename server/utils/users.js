// addUser(id, name, room);
// removeUser(id);
// getUser(id);
// getUserList(room);

class Users {
  constructor() {
    this.users = []
  }

  addUser(id, name, room) {
    let user = {id, name, room}
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    let chosenUser;
    for (let i = 0; i < this.users.length; i+= 1) {
      if (this.users[i].id === id) {
        chosenUser = this.users.splice(i, 1);
      }
    }
    if (!chosenUser) return undefined;
    return chosenUser[0];
  }

  getUser(id) {
    let chosenUser;
    for (let i = 0; i < this.users.length; i+= 1) {
      if (this.users[i].id === id) {
        chosenUser = this.users[i];
        break;
      }
    }

    return chosenUser;
  }

  getUserList(room) {
    let users = this.users.filter((user) => room === user.room);
    return users.map(user => user.name);
  }
}

module.exports = {Users};

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   getUserDescription() {
//     console.log(this.name, this.age);
//   }
// }

// let me = new Person('Jacob', 25);
// me.getUserDescription()