console.log('Working....');

const play = document.querySelector(".songsbuttons").children[1]
let currentSong = new Audio()
let songs;
let currentFolder;

const previous = document.getElementById("previous")
const next = document.getElementById("next")


function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    // Pad with zero if needed
    if (minutes < 10) minutes = "0" + minutes;
    if (secs < 10) secs = "0" + secs;

    return `${minutes}:${secs}`;
}

async function displayAlbum() {
    let a = await fetch(`http://192.168.100.6:3000/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".CardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0]
            // Get the metadata of the folder 
            let a = await fetch(`http://192.168.100.6:3000/songs/${folder}/info.json`)
            let response = await a.json()
            console.log(response)
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder = "${folder}" class="card rounded ">
                                <div class="play transition"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                        width="48" height="48">
                                        <!-- Green background circle -->
                                        <circle cx="12" cy="12" r="12" fill="#3BE477" />
        
                                        <!-- Solid black play button -->
                                        <path d="M9 8.5L16 12L9 15.5V8.5Z" fill="black" />
                                        </svg>
                                        </div>
                                <img src="/songs/${folder}/cover.jpeg" alt="">
                                <h2 class="invert">${response.title}</h2>
                                <p class="invert">${response.description}</p>
                            </div>`
        }
    }

    // Load the playlist whenever card is clicked 
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        })
    })
}



async function getSongs(folder) {
    currentFolder = folder;
    let a = await fetch(`http://192.168.100.6:3000/${folder}/`)
    let response = await a.text()


    let div = document.createElement("div")
    div.innerHTML = response



    let as = div.getElementsByTagName("a")

    songs = []


    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }

    }

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    console.log(songUL);




    for (let song of songs) {
        song = song.replaceAll("%20", " ")
        songUL.innerHTML = songUL.innerHTML + ` <li>
        <img src="musiv.svg" alt="">
                                <div class="info">
                                <span>${song}</span><br>
                             
                                </div>
                                <div class="playnow">

                                <span>Play Now</span>  
                                    <img src="play.svg" alt="">       
                                </div>                   
                                </li>`


    }



    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        }
        )

    }
    )


    return songs;
}

// Add an event listener to play
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play()
        play.src = "images/pause.svg"
    }
    else {
        currentSong.pause()
        play.src = "images/play.svg"
    }
})

function playMusic(track, pause = false) {
    currentSong.src = `/${currentFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "images/pause.svg"
    }
    // Adding name on the left of the playbar

    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = `00:00`

    // Wait until metadata is loaded
    currentSong.addEventListener("loadedmetadata", () => {
        document.querySelector(".songtime").innerHTML =
            `00:00 / ${formatTime(currentSong.duration)}`;
    });



    // Adding duration on the right of the playbar
    // console.log(currentSong.currentTime);

    currentSong.addEventListener("timeupdate", () => {
        console.log(formatTime(currentSong.currentTime));
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"

    }
    )

}

// Add an event listener to seek bar

document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent) / 100;
}
)

//Add an event listener to hamburger

document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0"
}
)

// Add an event listener to close 

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%"
}
)
// Add an event listener to previous 
previous.addEventListener("click", () => {
    console.log('Previous clicked');
    let index = songs.findIndex(song => song.endsWith(currentSong.src.split("/").pop()));
    if (index - 1 >= 0) {
        playMusic(songs[index - 1])
    }
});

// Add an event listener to next
next.addEventListener("click", () => {
    console.log('Next clicked');
    let index = songs.findIndex(song => song.endsWith(currentSong.src.split("/").pop()));
    if (index < songs.length - 1) {
        playMusic(songs[index + 1])
    }
});

// Add an event listener to volume button
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    console.log('Setting volume to ', e.target.value, "/100");

    currentSong.volume = parseInt(e.target.value) / 100

}
)

// Changing the volume button 
document.querySelector(".volume>img").addEventListener("click", e => {
    if (e.target.src.includes("volume.svg")) {
        e.target.src = e.target.src.replace("volume.svg", "volume_p.svg")
        console.log(e.target)
        currentSong.volume = 0
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0
    }
    else {
        e.target.src = e.target.src.replace("volume_p.svg", "volume.svg")
        currentSong.volume = 0.1;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 10

    }
})




async function main() {


    let songs = await getSongs("songs/eminem")
    console.log(songs);

    let firstsong = songs[0]

    playMusic(firstsong, true)


}
displayAlbum()
main()
