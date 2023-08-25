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


// // Switch cards
// function changeSeasonCard(season) {
//   seasonContant = season
//   cardsBox.removeChild(document.querySelector('.card-content'))
//   cardsBox.insertAdjacentHTML('afterbegin', seasonContant)
//   /* seasonContant.classList.add('active-card-content') */
//   // seasonContant.classList.remove('hidden')
// }

// winterInput.addEventListener('click', () => changeSeasonCard(`${winter}`))
// springInput.addEventListener('click', () => changeSeasonCard(`${spring}`))
// summerInput.addEventListener('click', () => changeSeasonCard(`${summer}`))
// autumnInput.addEventListener('click', () => changeSeasonCard(`${autumn}`))

let boxInput = document.querySelectorAll('.box__input')
boxInput.forEach(season => {
  season.addEventListener('click', ()=> {
    let currentEl = document.querySelector('.card-content-active')
    currentEl.classList.toggle('card-content-active')
    currentEl.classList.toggle('card-content-fade')
    if(season.classList.contains('box__input_spring')){
      let newEl = document.querySelector('.spring')
      newEl.classList.toggle('card-content-active')
      newEl.classList.toggle('card-content-fade')
    }
    if(season.classList.contains('box__input_winter')){
      let newEl = document.querySelector('.winter')
      newEl.classList.toggle('card-content-active')
      newEl.classList.toggle('card-content-fade')
    }
    if(season.classList.contains('box__input_summer')){
      let newEl = document.querySelector('.summer')
      newEl.classList.toggle('card-content-active')
      newEl.classList.toggle('card-content-fade')
    }
    if(season.classList.contains('box__input_autumn')){
      let newEl = document.querySelector('.autumn')
      newEl.classList.toggle('card-content-active')
      newEl.classList.toggle('card-content-fade')
    }
  })
})






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
    this.cardIsPaid = false;
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
  payForCard() {
    this.cardIsPaid = true
  }
}
const payForCardBtn = document.querySelector('#pay-for-card')
payForCardBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  //all fields are filled in
  let bankCardNumValue = document.querySelector('#bank-card-number').value
  if(bankCardNumValue == 16) {
    currentUser.payForCard()
    closeModalWindow()
  }
})

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
let myProfileBtn = []


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
  const storedAccounts = JSON.parse(localStorage.getItem('accounts'))
  storedAccounts.forEach((acc, i) => {
    if(acc.password == passwordValue && passwordValue.length >=8 && (acc.email == emailOrReadersCardValue || acc.cardNumber == emailOrReadersCardValue)) {
      document.querySelectorAll('.modal-log-in input').forEach(val => val.value = '')
      closeModalWindow()
      updateProfileAvatar(acc.fullName, acc.avatar)
      
      /* change drop menu + change profile = cardNumber */
      /* acc.addVisitsQty() */
      currentUser = acc
      // localStorage.setItem('accounts', JSON.stringify(accounts))
      changeDropMenuToAuth()
      updBtnsAndAddEvent()
      renderMyProfile(acc)
    }
    // else { return alert('Password and Email or Card Number are incorrect')}
  })
})

/* open my profile window */
const modalMyProfile = document.querySelector('#modal-my-profile')
/* copy card number icon */
const copyCardNumIcon = document.querySelector('.copy-icon')
copyCardNumIcon.addEventListener('click', () => {
  navigator.clipboard.writeText(`${document.querySelector('#profile__card-number')}`)
})

/* Update btns LOG OUT and MY PROFILE */
function updBtnsAndAddEvent(){
  logOutBtn = document.querySelector('.log-out-button')
  logOutBtn.addEventListener('click', toLogOut)
  myProfileBtn = document.querySelectorAll('.my-profile-button')
  myProfileBtn.forEach(val => {
    val.addEventListener('click', ()=> {
      modalMyProfile.classList.add('active-window')
      modalMyProfile.classList.remove('hidden-window')
      closeDropMenu()
    })
  })
}
/* render MY PROFILE */
function renderMyProfile(account){
  document.querySelector('#profile__avatar').textContent = account.avatar 
  document.querySelector('#profile__full-name').textContent = account.fullName 
  document.querySelector('#profile__card-visits').textContent = account.visits 
  document.querySelector('#profile__card-books').textContent = account.books 
  document.querySelector('#profile__card-number').textContent = account.cardNumber
  //add render books
}


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
  closeDropMenu()
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
    updBtnsAndAddEvent()
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




/* open buy-library-card before auth */
const modalBuy = document.querySelector('#modal-buy')
let buyBtn = document.querySelectorAll('.button-buy')
buyBtn.forEach(btn => {
  btn.addEventListener('click', ()=> {
    // карта не оплачена? => оплати карту
    modalBuy.classList.add('active-window')
    modalBuy.classList.remove('hidden-window')
    // карта оплачена? => buy меняется на own счетчик +1
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