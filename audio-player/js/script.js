let isPlaying = false
let isMuted = false
let buttonPlayAudio = document.querySelector('.play-pause-arrow')
const buttonNextTrack = document.querySelector('.next-arrow')
const buttonPrevTrack = document.querySelector('.prev-arrow')
const muteIcon = document.querySelector('.mute-box')
const audio = document.querySelector('audio')
audio.volume = 0.75;
audio.muted = false;
console.log(audio);




let durationInSeconds = +Math.trunc(+document.querySelector('#track').duration)
let minutes = +Math.trunc(+durationInSeconds/60)
let seconds = +durationInSeconds- minutes*60
let durationAudioPlayerFormat = `${minutes}:${seconds}`

const audiosSrc = ['audio/beyonce.mp3', 'audio/dontstartnow.mp3']
const audiosCover = ['img/lemonade.png', 'img/dontstartnow.png']
/* Next Btn */
// buttonNextTrack.addEventListener('click', ()=> {
//   /* new track */
//   /* updDuration */
// })

/* Prev Btn */

/* play / pause audio */
audio.addEventListener('loadeddata', ()=> {
  
  buttonPlayAudio.addEventListener('click', ()=> {
    buttonPlayAudio.classList.toggle('pause')
    // playAudio()
    if(audio.paused) {
      /* audio.currentTime = 0; */
      audio.play()
    } else {
      audio.pause()
    }
  })
})

/* function playAudio(){
  if(audio.paused) {
    audio.currentTime = 0;
    audio.play()
  } else {
    audio.pause()
  }
} */


/* play or pause */

/* mute / unmute */
muteIcon.addEventListener('click', ()=> {

  /* add/delete volume */
  audio.setAttribute("muted", "")
  console.log(isMuted);
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
// атрибут muted = "false"
/* 
console.log(`1. Вёрстка +10\
2. Кнопка Play/Pause +10\
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\
4. При смене аудиотрека меняется изображение - обложка аудиотрека +10\
5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. +10\
6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10\
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10`); */