import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseConfig } from "./config.js";

initializeApp(firebaseConfig);

const auth = getAuth();

const forms = document.querySelector(".forms");
const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");
const signInEmailInput = document.querySelector(".email-signin");
const signInPasswordInput = document.querySelector(".password-signin");
const signUpEmailInput = document.querySelector(".email-signup");
const signUpPasswordInput = document.querySelector(".password-signup");
const signUpRepasswordInput = document.querySelector(".repassword-signup");
const signInButton = document.getElementById("sign-in");
const signUpButton = document.getElementById("sign-up");
const signOutButton = document.getElementById("sign-out");
const accountSection = document.getElementById("account");

onAuthStateChanged(auth, (user) => {
  if (user) {
    container.style.display = "none";
    accountSection.style.display = "block";
    let emailP = document.getElementById("user-email");
    emailP.innerText = user.email;
  } else {
    container.style.display = "flex";
    accountSection.style.display = "none";
  }
});

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
  signOut(auth);
});

function signIn() {
  if (auth.currentUser) {
    signOut(auth);
  } else {
    const email = signInEmailInput.value;
    const password = signInPasswordInput.value;
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }
    // Sign in with email and pass.
    signInWithEmailAndPassword(auth, email, password).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      signInButton.disabled = false;
    });
  }
  signInButton.disabled = true;
}

/**
 * Handles the sign up button press.
 */
function signUp() {
  const email = signUpEmailInput.value;
  const password = signUpPasswordInput.value;
  const repassword = signUpRepasswordInput.value;

  if (email.length < 4) {
    alert("Please enter an email address.");
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
  // Create user with email and pass.
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {})
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}
