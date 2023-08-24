/* console.log('1.Вёрстка соответствует макету. Ширина экрана 768px +26\n2.Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3.На ширине экрана 768рх реализовано адаптивное меню +12\nTotal 50'); */

/* Burger */
const burgerButton = document.querySelector('.burger')
const nav = document.querySelector('.nav')
const burgerMenu = document.querySelector('.burger-menu')
const links = document.querySelectorAll('.nav__link')
const welcomeSection = document.querySelector('.welcome')

function toggleNav(){
  nav.classList.toggle('burger-menu')
  nav.classList.toggle('nav-hidden')
  burgerButton.classList.toggle('burger-rotate')
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


/* drop-menu */

const profileIcon = document.querySelector('.icon-profile__wrapper')

///* toggle open-close */
profileIcon.addEventListener('click', ()=> {
  let dropMenu = document.querySelector('.drop-menu-profile')
  dropMenu.classList.toggle('hidden-menu')
  dropMenu.classList.toggle('visible-menu')
})

const body = document.querySelector('body')
body.addEventListener('click', (e)=> {
  let dropMenu = document.querySelector('.visible-menu')
  /* Close drop-menu */
  if((e.target.className == 'welcome'|| e.target.classList[0] == 'burger') && dropMenu) {
    dropMenu.classList.add('hidden-menu')
    dropMenu.classList.remove('visible-menu')
  }
   /* close burger */
  if (nav.classList.contains('burger-menu') && (e.target.className == 'welcome' || e.target.parentNode.className == 'icon-profile__wrapper' )) {
    nav.classList.remove('burger-menu')
    nav.classList.add('nav-hidden')
    burgerButton.classList.remove('burger-rotate')
  }
})


/* carousel */
/* by ARROWS */
const rightArrow = document.querySelector('#right-arrow');
const leftArrow = document.querySelector('#left-arrow');
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0; 

/* left arrow */
leftArrow.addEventListener('click', () => {
  deleteActivePagination()
  
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselPosition();
    makeRightButtonAble()
  }
  if(currentIndex == 0) {
    makeLeftButtonDesabled()
  }
  setActivePag()
});

/* right arrow */
rightArrow.addEventListener('click', (e) => {
  deleteActivePagination()
  if (currentIndex < carouselItems.length - 1) {
    currentIndex++;
    updateCarouselPosition();
    makeLeftButtonAble()
  }
  if (currentIndex === carouselItems.length - 1) {
    makeRightButtonDesabled()
  }
  setActivePag()
});
function setActivePag() {
  slidePag[currentIndex].classList.add('slide-pagination_active')
}

function makeLeftButtonDesabled() {
  leftArrow.setAttribute('disabled', 'disabled')
  leftArrow.classList.add('arrow-disabled')
  document.querySelector('.left-pagination').setAttribute('disabled', 'disabled')
}
function makeRightButtonDesabled() {
  rightArrow.setAttribute('disabled', 'disabled')
  rightArrow.classList.add('arrow-disabled')
  document.querySelector('.right-pagination').setAttribute('disabled', 'disabled')
}
function makeLeftButtonAble() {
  leftArrow.classList.remove('arrow-disabled')
  leftArrow.removeAttribute('disabled', 'disabled')
  document.querySelector('.left-pagination').removeAttribute('disabled', 'disabled')
}
function makeRightButtonAble() {
  rightArrow.classList.remove('arrow-disabled')
  rightArrow.removeAttribute('disabled', 'disabled')
  document.querySelector('.right-pagination').removeAttribute('disabled', 'disabled')
}

function updateCarouselPosition() {
  const itemWidth = carouselItems[0].offsetWidth
  const newPosition = -currentIndex * (itemWidth); 
  carousel.style.transform = `translateX(${newPosition}px)`;
}

/* by PAGINATION */
const paginationItems = document.querySelectorAll('.pagination-wrapper')
const slidePag = document.querySelectorAll('.slide-pagination')

function deleteActivePagination() {
  slidePag.forEach(el => el.classList.remove('slide-pagination_active'))
}

let paginationIndex = 0

paginationItems.forEach((pagItem, index) => {
  let childPagItem = pagItem.children[0]
  pagItem.addEventListener('click', (el) => {
    currentIndex = index
    deleteActivePagination()
    childPagItem.classList.add('slide-pagination_active')
    updateCarouselPosition()
    if(currentIndex == 0) {
      makeLeftButtonDesabled()
    }
    if(currentIndex == 4) {
      makeRightButtonDesabled()
    }
    if(currentIndex > 0) {
      makeLeftButtonAble()
    }
    if(currentIndex < carouselItems.length - 1) {
      makeRightButtonAble()
    }
  })
})

/* Switch season */
let cardsBox = document.querySelector('.cards-box')
let winterInput = document.querySelector('#winter')
let springInput = document.querySelector('#spring')
let summerInput = document.querySelector('#summer')
let autumnInput = document.querySelector('#autumn')
let seasonContant
const buttonOwn = `<button disabled class="button button-own">Own</button>`
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
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-4.jpg" alt="book-image"></div>
  </div>
</div>
`
const spring = `
<div class="spring card-content ">
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
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-8.jpg" alt="book-image"></div>
  </div>
</div>`
const summer = `
<div class="summer card-content ">
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
      <button class="button button-buy">Buy</button>
      <div class="card__image"><img  src="img/book-12.jpg" alt="book-image"></div>
  </div>
</div>`
const autumn = `
<div class="autumn card-content ">
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
    <button class="button button-buy">Buy</button>
    <div class="card__image"><img  src="img/book-16.jpg" alt="book-image"></div>
  </div>
</div>`


// Switch cards
function changeSeasonCard(season) {
  seasonContant = season
  cardsBox.removeChild(document.querySelector('.card-content'))
  cardsBox.insertAdjacentHTML('afterbegin', seasonContant)
  /* seasonContant.classList.add('active-card-content') */
  // seasonContant.classList.remove('hidden')
}

winterInput.addEventListener('click', () => changeSeasonCard(`${winter}`))
springInput.addEventListener('click', () => changeSeasonCard(`${spring}`))
summerInput.addEventListener('click', () => changeSeasonCard(`${summer}`))
autumnInput.addEventListener('click', () => changeSeasonCard(`${autumn}`))



/* Accounts */
let accounts = []
/* load local storage */
window.addEventListener('load', () => {
  const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
  if (storedAccounts && Array.isArray(storedAccounts)) {
    accounts = storedAccounts;
  }
});
let currentUser

/* ???????????????? */
/* if(currentUser) {
  changeDropMenuToAuth()
  updateProfileAvatar(currentUser.fullName, currentUser.avatar)
}
 */

/* create class */
class Account{
  constructor(firstName, lastName, email, password){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avatar;
    this.cardNumber = '';
    this.visits = 0;
    this.books = 0;
    this.fullName;
  }
  createAvatar(firstName,lastName){
    this.avatar = `${(firstName.slice(0,1)+lastName.slice(0,1)).toUpperCase()}`
  }
  /* generate rundom Card Number */
  generateCardNumber() {
    const symbols = '0123456789ABCDEF'
    for(let i = 0; i < 9; i++){
      let rundomIndex = Math.floor(Math.random()*symbols.length)
      this.cardNumber += symbols[rundomIndex]
    }
  }
  createFullName(firstName,lastName){
    this.fullName = `${firstName} ${lastName}`
  }
  addVisitsQty() {
    this.visits ++
  }
  addBooksQty() {
    this.books ++
  }

}


/* MODAL WINDOWS */
/* close-on click X */
const btnsClose = document.querySelectorAll('.close-btn')
const modalWindows = document.querySelectorAll('.modal-window-wrapper')

function closeModalWindow() {
  let activeWindow = document.querySelector('.active-window')
  activeWindow.classList.add('hidden-window')
  activeWindow.classList.remove('active-window')
}
btnsClose.forEach(val => {
  val.addEventListener('click', (e)=> {
    e.preventDefault()
    closeModalWindow()
  })
})

/* close with background */
modalWindows.forEach(window => {
  window.addEventListener('click', event => {
    if(event.target.className == 'modal-window-wrapper active-window'){
      closeModalWindow()
    }
  })
})

function closeDropMenu() {
  let dropMenu = document.querySelector('.visible-menu')
  dropMenu.classList.add('hidden-menu')
  dropMenu.classList.remove('visible-menu')
}


/* open modal LOGIN */
const logInBtn = document.querySelectorAll('.log-in-button')
const signUp = document.querySelector('.button-sign-up')
const registerBtn = document.querySelectorAll('.register-button')
let logOutBtn 

const logInModal = document.querySelector('#modal-log-in')
const registerModal = document.querySelector('#modal-register')

logInBtn.forEach(btn =>{
  btn.addEventListener('click', ()=> {
  logInModal.classList.add('active-window')
  logInModal.classList.remove('hidden-window')
  registerModal.classList.remove('active-window')
  registerModal.classList.add('hidden-window')
  closeDropMenu()
  })
})

/* open modal REGISTER  */
registerBtn.forEach(btn =>{
  btn.addEventListener('click', ()=> {
    registerModal.classList.add('active-window')
    registerModal.classList.remove('hidden-window')
    logInModal.classList.remove('active-window')
    logInModal.classList.add('hidden-window')
    closeDropMenu()
  })
})
signUp.addEventListener('click', ()=> {
  registerModal.classList.add('active-window')
  registerModal.classList.remove('hidden-window')
  closeDropMenu()
})

/* Модальное окно `LOGIN` */
const loginModalBtn = document.querySelector('#login-modal-btn')
loginModalBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  let emailOrReadersCardValue = document.querySelector('#e-mail').value
  let passwordValue = document.querySelector('#password').value
  console.log(emailOrReadersCardValue);
  console.log(passwordValue);
  const storedAccounts = JSON.parse(localStorage.getItem('accounts'))
  storedAccounts.forEach((acc, i) => {
    if(acc.password == passwordValue && passwordValue.length >=8 && (acc.email == emailOrReadersCardValue || acc.cardNumber == emailOrReadersCardValue)) {
      document.querySelectorAll('.modal-log-in input').forEach(val => val.value = '')
      closeModalWindow()
      console.log('success');
      updateProfileAvatar(acc.fullName, acc.avatar)
      
      /* change drop menu + change profile = cardNumber */
      /* acc.addVisitsQty() */
      currentUser = acc
      // localStorage.setItem('accounts', JSON.stringify(accounts))
      changeDropMenuToAuth()
      logOutBtn = document.querySelector('.log-out-button')
      logOutBtn.addEventListener('click', toLogOut)
      console.log(logOutBtn);
    }
    // else { return alert('Password and Email or Card Number are incorrect')}
  })
})

function changeDropMenuToAuth() {
  let title = document.querySelector('.drop-menu-profile__title')
  title.textContent = currentUser.cardNumber
  title.classList.add('drop-menu-profile__title_small')      
  let btnsWrapper = document.querySelector('.drop-menu-profile__buttons-wrapper')
  btnsWrapper.innerHTML = `<button class="my-profile-button">My profile</button>
  <button class="log-out-button">Log Out</button>`
}

/* tologOut */


function toLogOut() {
  /* возврат аватарки */
  /* смена дроп меню */
  let title = document.querySelector('.drop-menu-profile__title')
  title.textContent = 'Profile'
  title.classList.remove('drop-menu-profile__title_small')
  let btnsWrapper = document.querySelector('.drop-menu-profile__buttons-wrapper')
  btnsWrapper.innerHTML = `<button class="log-in-button">Log In</button>
  <button class="register-button">Register</button>`
  /* очистка карент юзера */
  returnOldProfileAvatar()
}
function returnOldProfileAvatar(){
  let profWrapper = document.querySelector('.icon-profile__wrapper')
  profWrapper.innerHTML = '<img src="icons/icon_profile.svg" alt="icon-profile" class="icon-profile" id="icon-profile">'
}




/* Press key Register + check input values*/
const signUpModalBtn = document.querySelector('#sign-up-modal-btn')
/* get values from form */
signUpModalBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  let firstName = document.querySelector('#first-name').value
  let lastName = document.querySelector('#last-name').value
  let emailReg = document.querySelector('#e-mail-reg').value
  let passwordReg = document.querySelector('#password-reg').value
  /* validation inputs */
  if(!firstName || !lastName || !emailReg || !passwordReg) {
    alert('Please fill in all fields')
  }
  if(passwordReg.length<8) {
    alert('Password must be at least 8 characters')
  }
  let emailIsValid = validationEmail(emailReg)
  if(!emailIsValid) {
    alert('Please check the e-mail. It should contains @ and . ')
  }
  /* validation is successfuly */
  if(passwordReg.length>=8 && !!firstName && !!lastName && emailIsValid) {
    let account = new Account(firstName, lastName, emailReg, passwordReg)
    account.createAvatar(firstName, lastName)
    account.createFullName(firstName, lastName)
    account.generateCardNumber()
    account.addVisitsQty()
    accounts.push(account)
    localStorage.setItem('accounts', JSON.stringify(accounts))
    updateProfileAvatar(account.fullName, account.avatar)
    clearValue()
    closeModalWindow()
    currentUser = account
    changeDropMenuToAuth()
    logOutBtn = document.querySelector('.log-out-button')
    logOutBtn.addEventListener('click', toLogOut)
    console.log(logOutBtn);
  }
})
/* Validation email*/
function validationEmail(email){
  return email.length >=3 && email.includes('@')  && email.includes('.')? true : false
}
/* Clear inputs value */
function clearValue(){
  document.querySelector('#first-name').value = document.querySelector('#last-name').value = document.querySelector('#e-mail-reg').value = document.querySelector('#password-reg').value =''
}



/* localStorage.clear() */
/* Отображение страницы приходит в состояние после авторизации (этап 4). +2
 */

function updateProfileAvatar(fullName, avatar){
  let oldAvatar = document.querySelector('.icon-profile')
  let newAvatar = document.createElement('p');
  newAvatar.className = 'icon-profile__after-auth icon-profile';
  newAvatar.title = fullName;
  newAvatar.textContent = avatar;
  document.querySelector('.icon-profile__wrapper').replaceChild(newAvatar, oldAvatar)
}


/* open my profile window */
// const myProfileBtn = document.querySelector('.my-profile-button')
// const modalMyProfile = document.querySelector('#modal-my-profile')
// myProfileBtn.addEventListener('click', ()=> {
//   modalMyProfile.classList.add('active-window')
//   modalMyProfile.classList.remove('hidden-window')
// })


/* open buy-library-card before auth */
const modalBuy = document.querySelector('#modal-buy')
let buyBtn = document.querySelectorAll('.button-buy')
buyBtn.forEach(btn => {
  btn.addEventListener('click', ()=> {
    modalBuy.classList.add('active-window')
    modalBuy.classList.remove('hidden-window')
  })
})
/* При нажатии на любую кнопку Buy, после покупки абонемента, меняет вид кнопки на неактивную Own, добавляя единицу к счетчику книг в профиле. +2 */


const dropMenuBeforeAuth = `
<div class="drop-menu-profile__no-auth drop-menu-profile hidden-menu">
  <p class="drop-menu-profile__title">Profile</p>
  <hr class="drop-menu-profile__line">
  <div class="drop-menu-profile__buttons-wrapper">
    <button class="log-in-button">Log In</button>
    <button class="register-button">Register</button>
  </div>
</div>`

const dropMenuAfterAuth = `
<div class="drop-menu-profile__auth drop-menu-profile hidden-menu">
  <p class="drop-menu-profile__title">Profile</p>
  <hr class="drop-menu-profile__line">
  <div class="drop-menu-profile__buttons-wrapper">
    <button class="my-profile-button">My profile</button>
    <button class="log-out-button">Log Out</button>
  </div>
</div>`


/* buy a library card */
/* Для того, чтобы кнопка Buy была активна, все поля должны быть не пустыми. +2
Bank card number должен содержать 16 цифр. С пробелами каждые 4 символа или нет - значения не имеет. +2
Expiration code содержит 2 поля с ограничением в 2 цифры. +2
CVC должен содержать 3 цифры. +2
После удачного нажатия на кнопку Buy, окно закрывается, и больше мы к нему не возвращаемся. */
const buyCardinputs = document.querySelectorAll('.big-modal__wrapper input')
console.log(buyCardinputs);
/* function checkBuyActive(){
  buyCardinputs.forEach(val => {
    if(val.value >0) {
      // активируй кнопку
    } else {alert('')}
  })
} */


/*  Блок `Digital Library Cards`. */
const checkCardBtn = document.querySelector('.button-check-card')

checkCardBtn.addEventListener('click', ()=> {
  let nameValue = document.querySelector('#name').value
  let cardNumberValue = document.querySelector('#card-number').value
  const storedAccounts = JSON.parse(localStorage.getItem('accounts'))
  storedAccounts.forEach((acc, i) => {
    if(acc.cardNumber == cardNumberValue && acc.fullName == nameValue) {
      document.querySelector('.button-check-card__wrapper').classList.add('hidden')
      document.querySelector('.modal-profile__info-box').classList.remove('hidden')
      document.querySelector('.find-your-card__title').textContent = 'Your Library card'
      setTimeout(function(){
        document.querySelector('.button-check-card__wrapper').classList.remove('hidden')
        document.querySelector('.modal-profile__info-box').classList.add('hidden')
        document.querySelector('.find-your-card__title').textContent = 'Find your Library card'
        document.querySelector('#name').value = document.querySelector('#card-number').value = ''
      }, 10000)
    }
  })

})