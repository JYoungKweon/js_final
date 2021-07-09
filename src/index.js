import { App } from "./js/app.js";
import { musics } from "./js/musicDB.js";

let canvas = document.getElementById("jsCanvas");
const album = document.querySelectorAll(".albumCover");
const sing = document.querySelector(".albumSing");
let audioToggle = false;
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
  colors.push(rgbToHex(color[0], color[1], color[2]));
  for (let i = 0; i < colorpallete.length; i++) {
    colors.push(
      rgbToHex(colorpallete[i][0], colorpallete[i][1], colorpallete[i][2])
    );
  }
  //console.log(colors);
}

//console.log(musics);
const firstMusic = musics[Math.floor(Math.random() * musics.length)];
console.log(firstMusic);
console.log(firstMusic.musicAlbumFile);
sing.src = `sing/${firstMusic.musicFile}`;

for (let i = 0; i < album.length; i++) {
  //console.log(album);
  album[i].src = `albumCover/${firstMusic.musicAlbumFile}`;
  album[i].addEventListener("click", () => {
    //console.log(audioToggle);
    playSing(album[i]);
    if (audioToggle) {
      album[i].classList.add("playing");
    } else {
      album[i].classList.remove("playing");
    }
    canvas.classList.toggle("display");
  });
}

window.onload = () => {};
