let cards = document.querySelectorAll('.game-cards__card')




function reverseCard(card) {
  card.classList.toggle('reverse')
}
cards.forEach(card => card.addEventListener('click', ()=> {
  reverseCard(card)
} ))

/* one card is reversed => wait for second */

/* two cards are reversed => if card==card оставь их, else переверни обе обратно */
