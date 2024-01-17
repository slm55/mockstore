import User from "./User.js";
const forms = document.querySelector(".forms");
const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");
const signInNumberInput = document.querySelector(".number-signin");
const signInPasswordInput = document.querySelector(".password-signin");
const signUpNameInput = document.querySelector(".name-signup");
const signUpNumberInput = document.querySelector(".number-signup");
const signUpPasswordInput = document.querySelector(".password-signup");
const signUpRepasswordInput = document.querySelector(".repassword-signup");
const signInButton = document.getElementById("sign-in");
const signUpButton = document.getElementById("sign-up");
const signOutButton = document.getElementById("sign-out");
const accountSection = document.getElementById("account");

let currentUser = User.getCurrentUser();

if (currentUser) {
  container.style.display = "none";
  accountSection.style.display = "block";
  let emailP = document.getElementById("user-email");
  emailP.innerText = currentUser.username;
} else {
  container.style.display = "flex";
  accountSection.style.display = "none";
}

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    });
  });
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); //preventing form submit
    forms.classList.toggle("show-signup");
  });
});

signInButton.addEventListener("click", (e) => {
  e.preventDefault(); //preventing form submit
  signIn();
});

signUpButton.addEventListener("click", (e) => {
  e.preventDefault(); //preventing form submit
  signUp();
});

signOutButton.addEventListener("click", (e) => {
  e.preventDefault(); //preventing form submit
  signOut();
});

function signOut() {
  let currentUser = User.getCurrentUser();
  if (currentUser) {
    if (currentUser.logout()) {
      console.log("hi");
      window.location.reload();
    }
  }
}

function signIn() {
  let currentUser = User.getCurrentUser();
  if (currentUser) {
    return;
  } else {
    const number = signInNumberInput.value;
    const password = signInPasswordInput.value;
    if (number.length < 11) {
      alert("Please enter a phone number.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }

    let newUser = new User("", number, password);
    if (newUser.login()) {
      window.location = "index.html";
      return;
    }
  }
  signInButton.disabled = true;
}

/**
 * Handles the sign up button press.
 */
function signUp() {
  const username = signUpNameInput.value;
  const number = signUpNumberInput.value;
  const password = signUpPasswordInput.value;
  const repassword = signUpRepasswordInput.value;

  if (number.length < 11) {
    alert("Please enter a phone number.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }

  if (password !== repassword) {
    alert("Passwords are not the same.");
    return;
  }

  let newUser = new User(username, number, password);
  if (newUser.register()) {
    window.location = "index.html";
  }
}
