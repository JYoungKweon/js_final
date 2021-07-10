const loginDiv = document.querySelector(".wellcome");
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const DISPLAY_CLASSNAME = "display";
const USERNAME_KEY = "username";
//console.log(loginDiv);

function onLoginSubmit(event) {
  event.preventDefault();
  loginDiv.classList.add(HIDDEN_CLASSNAME);
  loginForm.classList.add(DISPLAY_CLASSNAME);
  const username = loginInput.value;

  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `Hello, "${username}"`;
  greeting.classList.remove(DISPLAY_CLASSNAME);
}

const savedusername = localStorage.getItem(USERNAME_KEY);

if (savedusername === null) {
  loginDiv.classList.remove(HIDDEN_CLASSNAME);
  loginForm.classList.remove(DISPLAY_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedusername);
  document.querySelector(".hidden").style.animation = "hideSplashScreen2";
}

loginDiv.addEventListener("mouseover", showAgain);

function showAgain() {
  document.querySelector(".hidden").style.opacity = "1";
}

loginDiv.addEventListener("mouseout", hideAgain);
function hideAgain() {
  document.querySelector(".hidden").style.opacity = "0";
}
