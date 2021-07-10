import { getCurrentMusic, setCurrentMusic } from "../index.js";
import { musics } from "./musicDB.js";

const audioControlArea = document.querySelector(".audioControlArea");
audioControlArea.addEventListener("click", callNextRandomSing);

function callNextRandomSing() {
  let currentMusic = getCurrentMusic();
  let nextMusicNumber;
  for (;;) {
    nextMusicNumber = Math.floor(Math.random() * musics.length);
    //console.log("current Music Number: " + currentMusic);
    //console.log("nextMusic: " + nextMusicNumber);
    if (nextMusicNumber !== currentMusic) {
      setCurrentMusic(musics[nextMusicNumber]);
      break;
    }
  }
}
