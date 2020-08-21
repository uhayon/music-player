const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
}

// Pause
function pauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select first song
loadSong(songs[songIndex]);

function getTimeString(time) {
  const timeMinutes = Math.floor(time / 60);
  let timeSeconds = Math.floor(time % 60);
  if (timeSeconds < 10) {
    timeSeconds = `0${timeSeconds}`;
  }

  return `${timeMinutes}:${timeSeconds}`;
}

function updateCurrentTime() {
  const { currentTime } = music;
  // Calculate display for currentTime
  const currentTimeString = getTimeString(currentTime);
  currentTimeEl.textContent = currentTimeString;
}

// Fires when the song is loaded
function onSongLoaded() {
  const { duration } = music;
  // Calculate display for duration
  const durationTimeString = getTimeString(duration);
  durationEl.textContent = durationTimeString;

  updateCurrentTime();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Update Progress Bar & Time
function onTimeUpdate(e) {
  const { duration, currentTime } = e.srcElement;
  if (isPlaying && duration && currentTime) {
    // Update progress bar width
    updateProgressBar();
    updateCurrentTime();
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  const currentTime = (clickX / width) * duration;
  music.currentTime = currentTime;
  updateCurrentTime();
  updateProgressBar();
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', onTimeUpdate);
music.addEventListener('ended', nextSong);
music.addEventListener('loadeddata', onSongLoaded);
progressContainer.addEventListener('click', setProgressBar);
