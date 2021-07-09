import { App } from "./js/app.js";

let canvas = document.getElementById("jsCanvas");
let album = document.querySelectorAll(".albumCover");
let sing = document.querySelector(".albumSing");
let audioToggle = false;
const colors = [];
let back = new App();

//console.log(sing);

for (let i = 0; i < album.length; i++) {
  //console.log(album);
  album[i].addEventListener("click", () => {
    //console.log(audioToggle);
    playSing(album[i]);
    album[i].classList.toggle("playing");
    canvas.classList.toggle("display");
  });
}

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
  const vibrant = new Vibrant(img, 256, 1);
  const swatches = vibrant.swatches();
  for (const swatch in swatches) {
    if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
      colors.push(swatches[swatch].getHex());
      //console.log(swatches[swatch].getHex());
    }
  }
}

window.onload = () => {};
