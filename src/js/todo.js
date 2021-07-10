const navBar = document.querySelector(".navBar");
const topBar = document.getElementById("topbar");
const toDo = document.querySelector(".todo");
const musicInfo = document.querySelector(".musicInfo");
const credit = document.querySelector(".credit");
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
const greeting = document.querySelector("#greeting");

import { navMode1, navMode2, navMode3 } from "../index.js";
import { paintGreetings } from "./greetings.js";
navBar.addEventListener("click", showToDo);
let todoFlag = false;
let creditFlag = false;

credit.addEventListener("mouseover", () => {
  creditFlag = true;
  //console.log(todoFlag);
});

credit.addEventListener("mouseout", () => {
  creditFlag = false;
  //console.log(todoFlag);
});

toDo.addEventListener("mouseover", () => {
  todoFlag = true;
  //console.log(todoFlag);
});
toDo.addEventListener("mouseout", () => {
  todoFlag = false;
  //console.log(todoFlag);
});
let clickFlag = 0;

export function getClickFlag() {
  return clickFlag;
}

const username = localStorage.getItem("username");
function showToDo() {
  //console.log("currentFlag :" + clickFlag);
  if (clickFlag === 0) {
    navStyle2();
    greeting.innerText = "TO DO LIST";
    toDo.classList.remove("display");
    musicInfo.classList.add("display");
    credit.classList.add("display");
    toDoInput.focus();
    clickFlag++;
  } else if (clickFlag === 1) {
    if (!todoFlag) {
      navStyle1();
      toDo.classList.add("display");
      musicInfo.classList.add("display");
      credit.classList.remove("display");
      paintGreetings(username);
      clickFlag++;
    }
  } else {
    if (!creditFlag) {
      navStyle3();
      toDo.classList.add("display");
      credit.classList.add("display");
      musicInfo.classList.remove("display");
      paintGreetings(username);
      clickFlag = 0;
    }
  }
}

function navStyle1() {
  //ty mode
  topBar.style.top = "-50px";
  topBar.style.opacity = "0";
  navBar.style.height = "17.2%";
  navBar.style.opacity = "1";
  navMode2();
  //navBarText.innerText = "test";
}

function navStyle2() {
  //todo Mode
  topBar.style.top = "0px";
  topBar.style.opacity = "1";
  navBar.style.height = "92%";
  navBar.style.opacity = "1";
  navMode3();
  //navMode3();
}

function navStyle3() {
  navBar.style = "";
  navMode1();
  //navMode1();
}

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

let tempLiValue;

function paintToDo(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  const span = document.createElement("span");
  span.innerText = newTodoObj.text;

  //const button = document.createElement("button");
  //button.innerText = "X";
  span.addEventListener("click", deleteToDo);
  span.addEventListener("mouseover", askDeleteToDo);
  span.addEventListener("mouseout", cancelDeleteToDo);

  li.appendChild(span);
  //li.appendChild(button);
  //console.log(li);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  //console.log(toDoInput.value);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function askDeleteToDo(event) {
  //console.log("call");
  const li = event.target.parentElement;
  tempLiValue = String(li.innerText);
  //console.log(tempLiValue);
  const span = li.childNodes;
  li.style.backgroundColor = "rgb(255,255,255)";
  span[0].innerText = "DELETE?";
}

function cancelDeleteToDo(event) {
  //console.log("call2");
  const li = event.target.parentElement;
  //console.log(tempLiValue);
  const span = li.childNodes;
  li.style.backgroundColor = "";
  span[0].innerText = tempLiValue;
}
