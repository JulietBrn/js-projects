/* console.log('1.Вёрстка валидная +10\n
2.Вёрстка семантическая +16\n
3.Вёрстка соответствует макету +54\n
4.Общие требования к верстке +20'); */
console.log('1.Вёрстка валидная +10\n2.Вёрстка семантическая +16\n3.Вёрстка соответствует макету +54\n4.Общие требования к верстке +20\nTotal 100');

const burgerButton = document.querySelector('.burger')
const nav = document.querySelector('.nav')
const burgerMenu = document.querySelector('.burger-menu')
const links = document.querySelectorAll('.nav__link')
const welcomeSection = document.querySelector('.welcome')

function toggleNav(){
  nav.classList.toggle('burger-menu')
  nav.classList.toggle('nav-hidden')
  burgerButton.classList.toggle('burger-rotate')
  console.log(nav.classList.contains('burger-menu'));
}
burgerButton.addEventListener('click', toggleNav)

welcomeSection.addEventListener('click', ()=> {
  if (nav.classList.contains('burger-menu')) {
  toggleNav()
  }
})



for (let value of links) { //для каждого элемента из псевдомассива
  value.addEventListener('click', toggleNav)
}