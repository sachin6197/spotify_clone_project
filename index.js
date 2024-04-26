let songs;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00"
  }
  const minutes = Math.floor(seconds / 60);
  // console.log("minuets"+ minutes)
  const remainingSeconds = Math.floor(seconds % 60);
  // console.log("remainseconds"+remainingSeconds)
  // Add leading zeros if necessary
  const minutesFormatted = String(minutes).padStart(2, "0");
  const secondsFormatted = String(remainingSeconds).padStart(2, "0");
  // console.log("minuetesformated"+minutesFormatted)
  // console.log("secondsformated"+secondsFormatted)
  return `${minutesFormatted}:${secondsFormatted}`;
}

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      const arraychop = songs.push(element.href.split("/songs/")[1]);
      // arraychop.split("/songs/")[1]
    }
  }
  return songs;
}
let currentSong = null;

const playMusic = (track) => {
  pauseplay.src = "pauseplay.svg";
  if (currentSong) {
    currentSong.pause();
  }
  currentSong = new Audio("/songs/" + track);
  currentSong.play();
  document.querySelector(".songInfo").innerHTML = track;
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )}/ 
  ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });
};

async function main() {
  songs = await getSongs();
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
              <img class="invert" src="music.svg" alt="music">
              <div class="info">
               ${song.replaceAll("%20", " ")}
              </div>
             <img class="invert2" src="pauseplay.svg" alt="play"></div>
            </li>`;
  }
  var infoElements = songUL.querySelectorAll(".info");
  infoElements.forEach(function (element) {
    element.addEventListener("click", function () {
      console.log("Clicked: " + element.innerHTML);
      playMusic(element.innerHTML.trim());

      console.log(element.innerHTML.trim());
    });
  });
  pauseplay.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      pauseplay.src = "pauseplay.svg";
    } else {
      currentSong.pause();
      pauseplay.src = "pause.svg";
    }
  });

  previous.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 > 0) {
      playMusic(songs[index - 1].replaceAll("%20", " "));
    }
  });

  next.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1].replaceAll("%20", " "));
    } 
  })
  document.getElementsByTagName("input")[0].addEventListener("change", (e) =>{
    // console.log(e.target, e.target.value, document.getElementsByTagName("input")[0])
    currentSong.volume = parseInt (e.target.value) / 100
  })

}

main();

// setInterval( function (){
//     let time = parseInt (a udio.currentTime / 60 - audio.currentTime / 60)
//     console.log (time)
// }, 1000)

// async function main (){
//     let a = await fetch ("http://127.0.0.1:5500/songs/")
//     let resposnse = await a.text();
//     console.log (resposnse)
//     let div = document.createElement("div")
//     div.innerHTML = resposnse;
//     let as = div.getElementsByTagName("a")
//     console.log(as);
//     songsList = [];
//     for (let index = 4; index < as.length; index++) {
//         const element = as[index];
//          console.log(element)
//         songsList.push(element)

//     }

// }
// main()
