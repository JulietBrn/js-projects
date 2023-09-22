let isPlay = false
const audio = document.querySelector('audio')
console.log(audio);
function playAudio(){
  if(isPlay) {
    audio.pause()
  }
  if(!isPlay) {
    audio.play()
  }
}