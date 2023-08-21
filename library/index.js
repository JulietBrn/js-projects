/* console.log('1.Вёрстка соответствует макету. Ширина экрана 768px +26\n2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3.На ширине экрана 768рх реализовано адаптивное меню +12\nTotal 50'); */

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

/* Switch season */
let cardsBox = document.querySelector('.cards-box')
let winterInput = document.querySelector('#winter')
let springInput = document.querySelector('#spring')
let summerInput = document.querySelector('#summer')
let autumnInput = document.querySelector('#autumn')
let seasonContant

const winter = `
<div class="winter card-content">
<!-- 1 -->
  <div class="card">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">The Book Eaters</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Sunyi Dean</span></p>
    <p class="card__description">An unusual sci-fi story about a book eater woman who tries desperately to save her dangerous mind-eater son from tradition and certain death. Complete with dysfunctional family values, light Sapphic romance, and a strong, complex protagonist. Not for the faint of heart.</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-1.jpg" alt="book-image"></div>
  </div>
  <!-- 2 -->
  <div class="card card-2">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Cackle</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Rachel Harrison</span></p>
    <p class="card__description">Are your Halloween movies of choice The Witches of Eastwick and Practical Magic? Look no further than here - where a woman recovering from a breakup moves to a quaint town in upstate New York and befriends a beautiful witch.</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-2.jpg" alt="book-image"></div>
  </div>
  <!-- 3 -->
  <div class="card ">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Dante: Poet of the Secular World</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Erich Auerbach</span></p>
    <p class="card__description">Auerbach's engaging book places the 'Comedy' within the tradition of epic, tragedy, and philosophy in general, arguing for Dante's uniqueness as one who raised the individual and his drama of soul into something of divine significance—an inspired introduction to Dante's main themes.</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-3.jpg" alt="book-image"></div>
  </div>
  <!-- 4 -->
  <div class="card card-2">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">The Last Queen</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Clive Irving</span></p>
    <p class="card__description">A timely and revelatory new biography of Queen Elizabeth (and her family) exploring how the Windsors have evolved and thrived as the modern world has changed around them.</p>
    <button disabled class="button button-own">Own</button>
    <div class="card__image"><img  src="img/book-4.jpg" alt="book-image"></div>
  </div>
</div>
`
const spring = `
<div class="spring card-content">
<!-- 5 -->
  <div class="card">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">The Body</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Stephen King</span></p>
    <p class="card__description">Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of innocence that is youth.</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-5.jpg" alt="book-image"></div>
  </div>
  <!-- 6 -->
  <div class="card card-2">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Carry: A Memoir of Survival on Stolen Land</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Toni Jenson</span></p>
    <p class="card__description">This memoir about the author's relationship with gun violence feels both expansive and intimate, resulting in a lyrical indictment of the way things are.</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-7.jpg" alt="book-image"></div>
  </div>
  
  <!-- 7 -->
  <div class="card">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Days of Distraction</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Alexandra Chang</span></p>
    <p class="card__description">A sardonic view of Silicon Valley culture, a meditation on race, and a journal of displacement and belonging, all in one form-defying package of spare prose.</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-6.jpg" alt="book-image"></div>
  </div>
  <!-- 8 -->
  <div class="card card-2">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Dominicana</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Angie Cruz</span></p>
    <p class="card__description">A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende and Julia Alvarez.</p>
    <button disabled class="button button-own">Own</button>
    <div class="card__image"><img  src="img/book-8.jpg" alt="book-image"></div>
  </div>
</div>`
const summer = `
<div class="summer card-content">
  <!-- 9 -->
  <div class="card">
      <p class="card__title ">Staff Picks</p>
      <hr class="card__line mb-20">
      <p class="card__book-title ">Crude: A Memoir</p>
      <p class="card__author text_bold mb-20"><span class="book-title">By Pablo Fajardo &amp; Sophie Tardy-Joubert</span></p>
      <p class="card__description">Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and her people</p>
      <button class="button button-buy">Buy</button>
      <div class="card__image"><img  src="img/book-9.jpg" alt="book-image"></div>
  </div>
  <!-- 10 -->
  <div class="card card-2">
      <p class="card__title ">Staff Picks</p>
      <hr class="card__line mb-20">
      <p class="card__book-title ">Let My People Go Surfing</p>
      <p class="card__author text_bold mb-20"><span class="book-title">By Yvon Chouinard</span></p>
      <p class="card__description">Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his experience of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant Businessman, Including 10 More Years of Business Unusual.</p>
      <button class="button button-buy">Buy</button>
      <div class="card__image"><img  src="img/book-10.jpg" alt="book-image"></div>
  </div>

  <!-- 11 -->
  <div class="card">
      <p class="card__title ">Staff Picks</p>
      <hr class="card__line mb-20">
      <p class="card__book-title ">The Octopus Museum: Poems</p>
      <p class="card__author text_bold mb-20"><span class="book-title">By Brenda Shaughnessy</span></p>
      <p class="card__description">This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age of environmental destruction, racism, sexism, and divisive politics.</p>
      <button class="button button-buy">Buy</button>
      <div class="card__image"><img  src="img/book-11.jpg" alt="book-image"></div>
  </div>
  <!-- 12 -->
  <div class="card card-2">
      <p class="card__title ">Staff Picks</p>
      <hr class="card__line mb-20">
      <p class="card__book-title ">Shark Dialogues: A Novel</p>
      <p class="card__author text_bold mb-20"><span class="book-title">By Kiana Davenport</span></p>
      <p class="card__description">An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and revolutionaries, lepers and healers.</p>
      <button disabled class="button button-own">Own</button>
      <div class="card__image"><img  src="img/book-12.jpg" alt="book-image"></div>
  </div>
</div>`
const autumn = `
<div class="autumn card-content">
  <!-- 13 -->
  <div class="card">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Casual Conversation</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Renia White</span></p>
    <p class="card__description">White's impressive debut collection takes readers through and beyond the concepts of conversation and the casual - both what we say to each other and what we don't, examining the possibilities around how we construct and communicate identity. </p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-13.jpg" alt="book-image"></div>
  </div>
  <!-- 14 -->
  <div class="card card-2">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">The Great Fire</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Lou Ureneck</span></p>
    <p class="card__description">The harrowing story of an ordinary American and a principled Naval officer who, horrified by the burning of Smyrna, led an extraordinary rescue effort that saved a quarter of a million refugees from the Armenian Genocide</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-14.jpg" alt="book-image"></div>
  </div>
  
  <!-- 15 -->
  <div class="card">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Rickey: The Life and Legend</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Howard Bryant</span></p>
    <p class="card__description">With the fall rolling around, one can't help but think of baseball's postseason coming up! And what better way to prepare for it than reading the biography of one of the game's all-time greatest performers, the Man of Steal, Rickey Henderson?</p>
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-15.jpg" alt="book-image"></div>
  </div>
  <!-- 16 -->
  <div class="card card-2">
    <p class="card__title ">Staff Picks</p>
    <hr class="card__line mb-20">
    <p class="card__book-title ">Slug: And Other Stories</p>
    <p class="card__author text_bold mb-20"><span class="book-title">By Megan Milks</span></p>
    <p class="card__description">Exes Tegan and Sara find themselves chained together by hairballs of codependency. A father and child experience the shared trauma of giving birth to gods from their wounds.</p>
    <button disabled class="button button-own">Own</button>
    <div class="card__image"><img  src="img/book-16.jpg" alt="book-image"></div>
  </div>
</div>`


// Переключение карточек
function changeSeasonCard(season) {
  seasonContant = season
  // changeActiveClass()
  cardsBox.removeChild(document.querySelector('.card-content'))

  cardsBox.insertAdjacentHTML('afterbegin', seasonContant)
}

// inputsBox.forEach(val => val.addEventListener('click', changeSeasonCard))
winterInput.addEventListener('click', () => changeSeasonCard(`${winter}`))
springInput.addEventListener('click', () => changeSeasonCard(`${spring}`))
summerInput.addEventListener('click', () => changeSeasonCard(`${summer}`))
autumnInput.addEventListener('click', () => changeSeasonCard(`${autumn}`))


/* drop-menu header */
/* toggle open-close */
const profileIcon = document.querySelector('#icon-profile')
let dropMenu = document.querySelector('.drop-menu-profile')
profileIcon.addEventListener('click', ()=> {
  dropMenu.classList.toggle('hidden-menu')
  dropMenu.classList.toggle('visible-menu')
})

/* logging-in */


/* modal-windows */
/* close-on click X */
const btnsClose = document.querySelectorAll('.close-btn')
const modalWindows = document.querySelectorAll('.modal-window-wrapper')
function closeModalWindowByX() {
  let activeWindow = document.querySelector('.active-window')

  activeWindow.classList.add('hidden-window')
  activeWindow.classList.remove('active-window')
}
btnsClose.forEach(val => {
  val.addEventListener('click', (e)=> {
    e.preventDefault()
    closeModalWindowByX()
  })
})