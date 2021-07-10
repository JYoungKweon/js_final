import { App } from "./js/app.js";
//import { hexToComplimentary } from "./js/complimentColor.js";
import { musics } from "./js/musicDB.js";
import "./js/todo.js";

let canvas = document.getElementById("jsCanvas");
const albumDiv = document.querySelector(".albumCover");
const album = document.querySelector(".albumCover img");
const sing = document.querySelector(".albumSing");
const clock = document.querySelector(".clock");
const albumTop = document.querySelector(".albumTop");
const singContainer = document.querySelector(".nowPlaying");
const weatherIcon = document.querySelector(".weather i");
const hiddenDiv = document.getElementById("topbar");
const hide = document.querySelectorAll(".hidden");
let audioToggle = false;
let mainColor;
let subColor;
let colors = [];
let back = new App();

//getBackgroundColor(album[0]);

function getBackgroundColor(img) {
  //console.log("new");
  const colorThief = new ColorThief();
  let color;
  let colorpallete = [];
  colors = [];

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  if (img.complete) {
    color = colorThief.getColor(img);
    colorpallete = colorThief.getPalette(img, 5, 1);
  } else {
    Image.addEventListener("load", function () {
      color = colorThief.getColor(img);
      colorpallete = colorThief.getPalette(img, 5, 1);
    });
  }
  mainColor = rgbToHex(color[0], color[1], color[2]);
  //subColor = hexToComplimentary(mainColor);
  subColor = rgbToHex(
    colorpallete[4][0],
    colorpallete[4][1],
    colorpallete[4][2]
  );
  colors.push(rgbToHex(color[0], color[1], color[2]));
  for (let i = 0; i < colorpallete.length; i++) {
    colors.push(
      rgbToHex(colorpallete[i][0], colorpallete[i][1], colorpallete[i][2])
    );
  }

  setMainColor(mainColor, subColor);
  //console.log(colors);
}

function setMainColor(color1, color2) {
  //console.log(color1);
  //console.log(color2);
  document.documentElement.style.setProperty("--main-bg-color", color1);
  document.documentElement.style.setProperty("--sub-color", color2);
}

//console.log(musics);
//console.log(firstMusic);
//console.log(firstMusic.musicAlbumFile);
let firstMusic = musics[Math.floor(Math.random() * musics.length)];
function musicSetting() {
  sing.src = `sing/${firstMusic.musicFile}`;
  album.src = `albumCover/${firstMusic.musicAlbumFile}`;
  navBarMusicTitle.innerText = `- ${firstMusic.musicTitle} -`;
  navBarSinger.innerText = `${firstMusic.musicSinger}`;
}

const navBarMusicTitle = document.querySelector(".navBar li:first-child");
const navBarSinger = document.querySelector(".navBar li:nth-child(2)");
const navBarThank = document.querySelector(".thanksTo");
const navBarDesigned = document.querySelector(".designedBy");
const navBarColorT = document.querySelector(".colorT");

export function navMode1() {
  //console.log(firstMusic.musicTitle);
  navBarMusicTitle.innerText = `- ${firstMusic.musicTitle} -`;
  navBarSinger.innerText = `${firstMusic.musicSinger}`;
  navBarThank.innerText = "";
  navBarDesigned.innerText = "";
  navBarColorT.innerText = "";
  navBarThank.style.marginBottom = "0px";
  navBarDesigned.style.marginBottom = "0px";
  navBarColorT.style.marginBottom = "0px";
}

export function navMode2() {
  //console.log("call nav2");
  navBarMusicTitle.innerText = "";
  navBarSinger.innerText = "";
  navBarThank.innerHTML = `THANKS TO: <a href="https://nomadcoders.co/" target="_blank">NOMADCODER</a> & <a href="https://www.youtube.com/user/cmiscm" target="_blank">INTERACTIVE DEVELOPER</a>`;
  navBarDesigned.innerHTML = `<a href="https://github.com/JYoungKweon" target="_blank">DESIGNED BY: JEON_YK</a>`;
  navBarColorT.innerHTML = `<a href="https://lokeshdhakar.com/projects/color-thief/" target="_blank">EXTRACT COLOR WITH COLOR_THEIF</a>`;
  navBarThank.style.marginBottom = "10px";
  navBarDesigned.style.marginBottom = "25px";
  navBarColorT.style.marginBottom = "10px";
  //console.log(navBarDesigned.innerText);
}

export function navMode3() {
  navBarMusicTitle.innerText = "";
  navBarSinger.innerText = "";
  navBarThank.innerText = "";
  navBarDesigned.innerText = "";
  navBarColorT.innerText = "";
  navBarThank.style.marginBottom = "0px";
  navBarDesigned.style.marginBottom = "0px";
  navBarColorT.style.marginBottom = "0px";
}

navMode1();

//console.log(album);
album.addEventListener("click", () => {
  //console.log("albumClick");
  if (!audioToggle) {
    getBackgroundColor(album);
    musicPlay();
  } else {
    musicPause();
  }
});

function musicPlay() {
  sing.play();
  back.draw(colors);
  singContainer.classList.add("playing");
  //document.querySelector(".audioControlArea").style.opacity = "1";
  document.querySelector(".filter").style.backgroundColor =
    "rgba(255,255,255,0.1)";
  weatherIcon.classList.add("weatherPlaying");
  clock.classList.add("clockplaying");
  albumTop.classList.add("albumTopPlaying");
  albumDiv.classList.add("shadow");
  canvas.classList.remove("display");
  audioToggle = true;
}

function musicPause() {
  back.stopDraw();
  sing.pause();
  document.documentElement.style.setProperty("--main-bg-color", "#000");
  document.documentElement.style.setProperty("--sub-color", "#fff");
  document.querySelector(".filter").style.backgroundColor =
    "rgba(0, 0, 0, 0.6)";
  //document.querySelector(".audioControlArea").style.opacity = "0";
  weatherIcon.classList.remove("weatherPlaying");
  clock.classList.remove("clockplaying");
  albumTop.classList.remove("albumTopPlaying");
  singContainer.classList.remove("playing");
  albumDiv.classList.remove("shadow");
  canvas.classList.add("display");
  audioToggle = false;
}

export function getCurrentMusic() {
  return firstMusic.musicNum;
}

export function setCurrentMusic(music) {
  //console.log("music change");
  firstMusic = music;
  musicPause();
  musicSetting();
}

musicSetting();
window.onload = () => {};
