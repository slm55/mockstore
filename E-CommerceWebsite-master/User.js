import Cart from "./CartClass.js"

export default class User {
  #username;
  #number;
  #password;
  #cart;
  #purchases;

  constructor(username, number, password, cart = new Cart(), purchases=[]) {
    this.#username = username;
    this.#number = number;
    this.#password = password;
    this.#cart = cart;
    this.#purchases = purchases;
  }

  get username() {
    return this.#username;
  }

  get number() {
    return this.#number;
  }

  register() {
    return this.#addUser();
  }

  login() {
    let user = this.#authenticateUser(this.#number, this.#password);
    if (user) {
      if (user.cart) {
        user.cart.concat((new Cart()).products);
      }
      this.#setCurrentUser(user.username, user.number, user.password, user.cart, user.purchases);
      return true;
    } else {
      return true;
    }
  }

  logout() {
    if (User.getCurrentUser()) {
      this.#removeCurrentUser();
      return true;
    } else {
      alert("invalid logout");
      return false;
    }
  }

  purchase() {
    this.#purchases.push(this.#cart);
    this.#cart = [];
    console.log(this);
    const cart = new Cart();
    cart.clearCart();
    this.#save();
  }

  static getCurrentUser() {
    let currentUserJson = localStorage.getItem("current user");
    let currentUser = JSON.parse(currentUserJson);
    return currentUserJson
      ? new User(currentUser.username, currentUser.number, currentUser.password, currentUser.cart, currentUser.purchases)
      : null;
  }

  #setCurrentUser() {
    localStorage.setItem("current user", JSON.stringify(this));
  }

  #removeCurrentUser() {
    localStorage.removeItem("current user");
  }

  #save () {
    localStorage.setItem("current user", this.toJSON());
  }

  #addUser() {
    let usersJson = localStorage.getItem("users");
    let users = usersJson ? JSON.parse(usersJson) : [];

    if ( users.find((user) => {
        user.number == this.#number;
      })
    ) {
      alert("User exists");
      return false;
    } else {
      users.push(this);
      console.log(JSON.stringify(users));
      localStorage.setItem("users", JSON.stringify(users));
      console.log(this);
      localStorage.setItem("current user", JSON.stringify(this));
      return true;
    }
  }

  #authenticateUser(number, password) {
    let usersJson = localStorage.getItem("users");
    let users = usersJson ? JSON.parse(usersJson) : [];
    let user = users.find((user) => {
      return user.number == number;
    });
    return user.password == password ? user : null;
  }

  toJSON() {
    return {
      username: this.#username,
      number: this.#number,
      password: this.#password,
      cart: this.#cart,
      purchases: this.#purchases,
    };
  }
}
