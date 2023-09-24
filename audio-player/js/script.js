let isPlaying = false
let isMuted = false
let buttonPlayAudio = document.querySelector('.play-pause-arrow')
const buttonNextTrack = document.querySelector('.next-arrow')
const buttonPrevTrack = document.querySelector('.prev-arrow')
const muteIcon = document.querySelector('.mute-box')
let audio = document.querySelector('audio')
let trackSinger = document.querySelector('.track-singer')
let trackName = document.querySelector('.track-name')
let trackDuration = document.querySelector('#track-duration')
let progressBar = document.querySelector('.progress-bar')
audio.volume = 0.75;
audio.muted = false;
let durationInSeconds
let minutes
let seconds


audio.addEventListener('loadedmetadata', ()=> {
  trackDuration.textContent = updDuration()
})

function updDuration() {
  durationInSeconds = +Math.trunc(+document.querySelector('#track').duration)
  minutes = +Math.trunc(+durationInSeconds/60)
  seconds = +durationInSeconds- minutes*60
  if(seconds<10) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}
function currTimeToDateFormat() {
  durationInSeconds = +Math.trunc(+document.querySelector('#track').currentTime)
  minutes = +Math.trunc(+durationInSeconds/60)
  seconds = +durationInSeconds - minutes*60
  if(seconds<10) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}


const audiosSrc = ['audio/beyonce.mp3', 'audio/dontstartnow.mp3', 'audio/million.mp3']
const audiosCover = ['img/lemonade.png', 'img/dontstartnow.png', 'img/million.jpg']
const trackSingers = ['Beyonce', 'Dua Lipa', 'Alla P.']
const trackNames = ['Don\'t Hurt Yourself', 'Don\'t start now', 'Million alyh roz']

/* set attr for newTrack */
function setAttribute(index) {
  audio.setAttribute('src', audiosSrc[index])
  document.querySelector('.bg-image').setAttribute('src', audiosCover[index])
  document.querySelector('.audio-player__img').setAttribute('src', audiosCover[index])
  trackSinger.textContent = trackSingers[index]
  trackName.textContent = trackNames[index]
}

function prevTrack() {
  /* new track */
  let isAudioPaused = audio.paused
  let currIndex = audiosSrc.indexOf(audio.getAttribute('src'))
  let newIndex
  if(currIndex !== (audiosSrc.length-1)) {
    newIndex = currIndex+1
  } else {
    newIndex = 0
  }
  setAttribute(newIndex)
  audio.currentTime = 0
  if(!isAudioPaused) {
    audio.play()
  } 
  /* updDuration */
  audio = document.querySelector('#track')
  audio.addEventListener('loadedmetadata', () => {
    trackDuration.textContent = updDuration();
  });
}

function nextTrack() {
  /* new track */
  let isAudioPaused = audio.paused
  let currIndex = audiosSrc.indexOf(audio.getAttribute('src'))
  let newIndex
  if(currIndex === 0) {
    newIndex = audiosSrc.length-1
  } else {
    newIndex = currIndex-1
  }
  setAttribute(newIndex)
  /* updDuration */
  audio = document.querySelector('#track')
  audio.currentTime = 0
  if(!isAudioPaused) {
    audio.play()
  } 
  audio.addEventListener('loadedmetadata', () => {
    trackDuration.textContent = updDuration();
  });
}
/* Next Btn */
buttonNextTrack.addEventListener('click', ()=> {
  prevTrack()
})

/* Prev Btn */
buttonPrevTrack.addEventListener('click', ()=> {
  nextTrack()
})

/* play or pause */
function playAudio() {
  if(!isPlaying) {
    audio.play()
  } else {
    audio.pause()
  }
  isPlaying = !isPlaying
}
/* play / pause audio */
buttonPlayAudio.addEventListener('click', ()=> {
  buttonPlayAudio.classList.toggle('pause')
  playAudio()
})

/* progress bar */
function updProgress() {
  progressBar.max = audio.duration
  progressBar.value = audio.currentTime
  document.querySelector('.current-time').textContent = currTimeToDateFormat()
}
setInterval(updProgress, 500)

/* change progressBar => cnahge song */
progressBar.addEventListener('change', ()=> {
  audio.currentTime = progressBar.value
})
/* next song after ending current */
audio.addEventListener('ended', ()=> {
  nextTrack()
  audio.play()
})
/* mute / unmute */
muteIcon.addEventListener('click', ()=> {
  /* add/delete volume */
  audio.setAttribute("muted", "")
  if(isMuted) {
    audio.muted = false
  } else
  if(!isMuted) {
    audio.muted = true
  }
  isMuted = !isMuted
  /* changeIcon */
  muteIcon.classList.toggle('mute-off')
})

console.log(`1. Вёрстка +10\n2. Кнопка Play/Pause +10\n3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n4. При смене аудиотрека меняется изображение - обложка аудиотрека +10\n5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. +10\n6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10\n7. Дополнительный не предусмотренный в задании функционал, улучшающий качество приложения(added mute) +10\nTotal: 60 / 60`);