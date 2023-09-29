let cards = document.querySelectorAll('.game-cards__card')

let oneIsReversed = false
let firstCard, secondCard
let firstAttr, secondAttr
let lockGameTable = false
let countClick = 0

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
rundomiseCards()