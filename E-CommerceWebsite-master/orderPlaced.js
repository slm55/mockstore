import User from "./User.js";

document.cookie = "orderId="+0 +",counter="+0

const user = User.getCurrentUser();
console.log(user);
user.purchase();

