import { App } from "./js/app.js";
import { hexToComplimentary } from "./js/complimentColor.js";
import { musics } from "./js/musicDB.js";

let canvas = document.getElementById("jsCanvas");
const albumDiv = document.querySelector(".albumCover");
const album = document.querySelectorAll(".albumCover img");
const sing = document.querySelector(".albumSing");
const clock = document.querySelector(".clock");
const albumTop = document.querySelector(".albumTop");
const singContainer = document.querySelector(".nowPlaying");
const weatherIcon = document.querySelector(".weather i");
let audioToggle = false;
let mainColor;
let subColor;
let colors = [];
let back = new App();

//console.log(sing);

function playSing(img) {
  if (!audioToggle) {
    getBackgroundColor(img);
    sing.play();
    back.draw(colors);
    audioToggle = true;
  } else {
    sing.pause();
    back.stopDraw();
    audioToggle = false;
  }
}

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
    colorpallete = colorThief.getPalette(img, 10, 1);
  } else {
    Image.addEventListener("load", function () {
      color = colorThief.getColor(img);
      colorpallete = colorThief.getPalette(img, 10, 1);
    });
  }
  mainColor = rgbToHex(color[0], color[1], color[2]);
  subColor = hexToComplimentary(mainColor);
  //subColor = rgbToHex(
  //  colorpallete[2][0],
  //  colorpallete[2][1],
  //  colorpallete[2][2]
  //);
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
  console.log(color1);
  console.log(color2);
  document.documentElement.style.setProperty("--main-bg-color", color1);
  document.documentElement.style.setProperty("--sub-color", color2);
}

//console.log(musics);
const firstMusic = musics[Math.floor(Math.random() * musics.length)];
//console.log(firstMusic);
//console.log(firstMusic.musicAlbumFile);
sing.src = `sing/${firstMusic.musicFile}`;

for (let i = 0; i < album.length; i++) {
  //console.log(album);
  album[i].src = `albumCover/${firstMusic.musicAlbumFile}`;
  album[i].addEventListener("click", () => {
    playSing(album[i]);
    if (audioToggle) {
      singContainer.classList.add("playing");
      document.querySelector(".audioControlArea").style.opacity = "1";
      weatherIcon.classList.add("weatherPlaying");
      clock.classList.add("clockplaying");
      albumTop.classList.add("albumTopPlaying");
      albumDiv.classList.add("shadow");
      //album[i].classList.add("playing");
    } else {
      document.querySelector(".audioControlArea").style.opacity = "0";
      weatherIcon.classList.remove("weatherPlaying");
      clock.classList.remove("clockplaying");
      albumTop.classList.remove("albumTopPlaying");
      singContainer.classList.remove("playing");
      albumDiv.classList.remove("shadow");
      //album[i].classList.remove("playing");
    }
    canvas.classList.toggle("display");
  });
}
window.onload = () => {};
