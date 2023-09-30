
console.log(`1. Вёрстка +10\n2. Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10\n3. Игра завершается, когда открыты все карточки +10\n4. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10\n5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10\n6. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10\n7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10\nTotal: 60 / 60`);
let cards = document.querySelectorAll('.game-cards__card')

let oneIsReversed = false
let firstCard, secondCard
let firstAttr, secondAttr
let lockGameTable = false
let countClick = 0
let isFinished

function reverseCard() {
  if(lockGameTable) return;
  countClick += 1
  this.classList.add('reverse')
  if(this === firstCard) return
  /* get first card */
  if(!oneIsReversed) {
    oneIsReversed = true
    firstCard = this
    firstAttr = getAttr(firstCard) 
    // get second card
  } else if (oneIsReversed) {
    secondCard = this
    secondAttr = getAttr(secondCard) 
    // not matched
    if((firstAttr !== secondAttr) && firstAttr && secondAttr) {
      lockGameTable = true
      setTimeout(removeReverseClass, 1000)
    } else
    // matched
    if((firstAttr === secondAttr) && firstAttr && secondAttr) {
      removeEventListonCard()
      clearCardsAndAttrs()
    }
    oneIsReversed = false
  }
}
function getAttr(c) {
  return c.querySelector('.card__front-side').attributes[0].value
}

function removeReverseClass(){
  firstCard.classList.remove('reverse')
  secondCard.classList.remove('reverse')
  lockGameTable = false
  clearCardsAndAttrs()
}

function removeEventListonCard() {
  firstCard.removeEventListener('click', reverseCard)
  secondCard.removeEventListener('click', reverseCard)
}

function clearCardsAndAttrs() {
  firstCard = secondCard = firstAttr = secondAttr = ''
  lockGameTable = false
  oneIsReversed = false
}

cards.forEach(card => card.addEventListener('click', reverseCard))

/* one card is reversed => wait for second */

/* two cards are reversed => if card==card оставь их, else переверни обе обратно */

/* function random order */
function rundomiseCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16)
    card.style.order = randomPos
  })
}
// rundomiseCards()


cards.forEach(card => card.addEventListener('click', checkAllCardsReversed))

function checkAllCardsReversed(){
  setTimeout(()=> {
    let arrLength = document.querySelectorAll('.reverse').length
    if(arrLength === 16) {
      currentGamer.score = countClick
      /* add gamer to scoreList */
      scoreList.unshift(currentGamer)
      /* render actual scoreTable */
      updLocalStorage()
      clearRenderedList()
      updRenderedList()
      addCover()
    }
  }, 300)
  
}

function addCover() {
  document.querySelector('.game-cards-cover').classList.add('game-cards-cover_active')
}
function removeCover(){
  document.querySelector('.game-cards-cover').classList.remove('game-cards-cover_active')
}

let renderedList = document.querySelector('.list')
function clearRenderedList(){
  renderedList.innerHTML = ''
}

function updRenderedList(){
  scoreList.map(gamer => {
    let listItem = `<li class="text">${gamer.name} - ${gamer.score}</li>`
    renderedList.insertAdjacentHTML('beforeend', listItem)
  })
  if(scoreList) {
    findBestPlayer()
  }
} 
/* find the best player */
function findBestPlayer(){
  let scoreArr = []
  scoreList.forEach(gamer => {
    scoreArr.push(gamer.score)
  })
  let bestIndex = scoreArr.indexOf(Math.min(...scoreArr))
  let bestPlayer = scoreList[bestIndex]
  document.querySelector('.best-score').innerHTML = ''
  bestPlayer = `
  <p class="text text_bold ">BEST RESULT<br> ⭐${bestPlayer.name} - ${bestPlayer.score}⭐</p>`
  document.querySelector('.best-score').insertAdjacentHTML('beforeend', bestPlayer)
}

/* remove reverse class all cards */

function resetGame() {
  countClick = 0
  cards.forEach(card => {
    card.classList.remove('reverse');
    card.addEventListener('click', reverseCard);
  });
}

/* local storage */
let currentGamer
let scoreList = []
/* load local storage */
window.addEventListener('load', () => {
  let storedGamers = JSON.parse(localStorage.getItem('scoreList'))
  if(storedGamers) {
    if (storedGamers.length >= 10) {
      storedGamers = storedGamers.slice(0,10)
    }
    scoreList = storedGamers
    clearRenderedList()
    updRenderedList()
  }
})

/* upd local st */
function updLocalStorage(){
  localStorage.setItem('scoreList', JSON.stringify(scoreList));
}
class gamerScore {
  constructor(name){
    this.name = name;
    this.score = 0;
  }
}


/* new game */
addCover()

const newGameBtn = document.querySelector('.new-game-btn')
newGameBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  // document.location.reload()
  resetGame()
  rundomiseCards()
  removeCover()
  lockGameTable = false
  // new user
  
  let currName = document.querySelector('.input-name').value
  if(currName) {
    currentGamer = new gamerScore(currName)
    return currentGamer
  }
  return currentGamer
})
/* localStorage.clear() */