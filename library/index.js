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
  let dropMenu = document.querySelector('.drop-menu-profile')
  dropMenu.classList.add('hidden-menu')
  dropMenu.classList.remove('visible-menu')
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
let currentUser
let accounts = []
/* load local storage */
window.addEventListener('load', () => {
  const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
  if (storedAccounts && Array.isArray(storedAccounts)) {
    accounts = storedAccounts;
    let index = accounts.findIndex(account => account.activeUser == true)
    if(index != -1) {
      currentUser = accounts[index]
      renderOwnedBooks(currentUser)
      updateProfileAvatar(currentUser)
      changeDropMenuToAuth()
      updBtnsAndAddEvent()
      renderLibraryCardSectionAfterLogIn(currentUser)
      /* нужно чтобы проверялись книги и кнопки заменялись на own */
      
    }
  }
});

const bookTitles = document.querySelectorAll('.card__book-title')
const bookAuthors = document.querySelectorAll('.card__author')
const bookList = document.querySelector('.modal-profile__book-list')
function renderOwnedBooks(currentUser){
  bookList.innerHTML = ''
  for(let i = 0; i<currentUser.rentedBooks.length; i++) {
    let rentedBook
    
    if (currentUser.rentedBooks[i]== 1) {
      btnsBuyWrapper[i].innerHTML = buttonOwn
      /*  */
      
      rentedBook = document.createElement('li')
      rentedBook.textContent = `${bookTitles[i].textContent}, ${bookAuthors[i].textContent.replace('By ', '')}`
      rentedBook.classList.add('modal-profile__text')
      bookList.append(rentedBook)
    }
  }
}


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
    this.activeUser = false;
    this.rentedBooks = []
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
  createRentedBooksArray(){
    for(let i=0; i<16; i++) {
      this.rentedBooks.push(0)
    }
    
  }
}
/* active buy-btn in modal Buy a L Card */
body.addEventListener('keyup', ()=> {
  const month = document.querySelector('#expiration-code-month').value
  const year = document.querySelector('#expiration-code-year').value
  const cvc = document.querySelector('#cvc').value
  const name = document.querySelector('#cardholder-name').value
  const postalCode = document.querySelector('#postal-code').value
  const city = document.querySelector('#city').value
  let bankCardNumValue = document.querySelector('#bank-card-number').value
  if(month != '' && year != '' && cvc != '' && name != '' && postalCode != '' && city != '' && bankCardNumValue !='') {
    payForCardBtn.removeAttribute('disabled')
    payForCardBtn.classList.remove('disabled')
  } else {
    payForCardBtn.setAttribute('disabled', 'disabled')
    payForCardBtn.classList.add('disabled')
  }
})


/* BUY a library card */
const payForCardBtn = document.querySelector('#pay-for-card')

payForCardBtn.addEventListener('click', (e)=> {
  e.preventDefault()
  const bigModalInputs = document.querySelectorAll('.big-modal__wrapper input')
  
  //all fields are filled in
  let result = checkInputs()
  if(result) {
    currentUser.cardIsPaid = true
    updUserDataInStorage()
    closeModalWindow()
    
  } else {alert('Please, check the fields.')}
})

function checkInputs(){
  const month = document.querySelector('#expiration-code-month').value
  const year = document.querySelector('#expiration-code-year').value
  const cvc = document.querySelector('#cvc').value
  const name = document.querySelector('#cardholder-name').value
  const postalCode = document.querySelector('#postal-code').value
  const city = document.querySelector('#city').value
  let bankCardNumValue = document.querySelector('#bank-card-number').value
  if(month != '' && year != '' && cvc != '' && name != '' && postalCode != '' && city != '' && bankCardNumValue.length == 16 && cvc.length == 3) {
    return true
  } else {false}
}


function updUserDataInStorage(){
  const userIndex = accounts.findIndex(account => account.email === currentUser.email);
    if (userIndex !== -1) {
      accounts[userIndex] = currentUser;
      localStorage.setItem('accounts', JSON.stringify(accounts));
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
  if(dropMenu) {
    dropMenu.classList.add('hidden-menu')
    dropMenu.classList.remove('visible-menu')
  }
}


/* open modal LOGIN */
let logInBtn = document.querySelectorAll('.log-in-button')
const signUp = document.querySelector('.button-sign-up')
let registerBtn = document.querySelectorAll('.register-button')
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
      updateProfileAvatar(acc)
      currentUser = acc
      currentUser.visits ++
      currentUser.activeUser = true
      renderOwnedBooks(currentUser)
      updUserDataInStorage()
      changeDropMenuToAuth()
      updBtnsAndAddEvent()
      renderLibraryCardSectionAfterLogIn(currentUser)
    }
    // else { return alert('Password and Email or Card Number are incorrect')}
  })
})

/* copy card number icon */
const copyCardNumIcon = document.querySelector('.copy-icon')
copyCardNumIcon.addEventListener('click', () => {
  navigator.clipboard.writeText(`${currentUser.cardNumber}`)
})


/* open my profile window */
const modalMyProfile = document.querySelector('#modal-my-profile')
/* Update btns LOG OUT and MY PROFILE */
function updBtnsAndAddEvent(){
  logOutBtn = document.querySelector('.log-out-button')
  logOutBtn.addEventListener('click', toLogOut)
  myProfileBtn = document.querySelectorAll('.my-profile-button')
  myProfileBtn.forEach(val => {
    val.addEventListener('click', ()=> {
      renderMyProfile(currentUser)
      modalMyProfile.classList.add('active-window')
      modalMyProfile.classList.remove('hidden-window')
      closeDropMenu()
    })
  })
}
/* render MY PROFILE modal window*/
function renderMyProfile(account){
  document.querySelector('#profile__avatar').textContent = account.avatar 
  document.querySelector('#profile__full-name').textContent = account.fullName 
  document.querySelector('#profile__card-visits').textContent = account.visits 
  document.querySelector('#profile__card-books').textContent = account.books 
  document.querySelector('#profile__card-number').textContent = account.cardNumber
  renderOwnedBooks(currentUser)
}
function renderStatInYourCard(account) {
  document.querySelector('#your-card__visits').textContent = account.visits 
  document.querySelector('#your-card__books').textContent = account.books 
}


function changeDropMenuToAuth() {
  let title = document.querySelector('.drop-menu-profile__title')
  title.textContent = currentUser.cardNumber
  title.classList.add('drop-menu-profile__title_small')      
  let btnsWrapper = document.querySelector('.drop-menu-profile__buttons-wrapper')
  btnsWrapper.innerHTML = `<button class="my-profile-button">My profile</button>
  <button class="log-out-button">Log Out</button>`
}

/* to logOut */
function toLogOut() {
  /* возврат аватарки */
  /* смена дроп меню */
  closeDropMenu()
  currentUser.activeUser = false
  updUserDataInStorage()
  currentUser = ''
  let title = document.querySelector('.drop-menu-profile__title')
  title.textContent = 'Profile'
  title.classList.remove('drop-menu-profile__title_small')
  let btnsWrapper = document.querySelector('.drop-menu-profile__buttons-wrapper')
  btnsWrapper.innerHTML = `<button class="log-in-button">Log In</button>
  <button class="register-button">Register</button>`
  /* очистка карент юзера */
  returnOldProfileAvatar()
  updBtnsCollection()
  document.location.reload()
}
function updBtnsCollection(){
  logInBtn = document.querySelectorAll('.log-in-button')
  registerBtn = document.querySelectorAll('.register-button')
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
    account.activeUser = true
    account.createRentedBooksArray()
    accounts.push(account)
    
    localStorage.setItem('accounts', JSON.stringify(accounts))
    
    clearValue()
    closeModalWindow()
    currentUser = account
    updateProfileAvatar(currentUser)
    renderLibraryCardSectionAfterLogIn(currentUser)
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
/* update AVATAR */
function updateProfileAvatar(acc){
  let oldAvatar = document.querySelector('.icon-profile')
  let newAvatar = document.createElement('p');
  newAvatar.className = 'icon-profile__after-auth icon-profile';
  newAvatar.title = acc.fullName;
  newAvatar.textContent = acc.avatar;
  document.querySelector('.icon-profile__wrapper').replaceChild(newAvatar, oldAvatar)
}




/* BUY-btn behavior  */
const modalBuy = document.querySelector('#modal-buy')
let buyBtn = document.querySelectorAll('.button-buy')
const btnsBuyWrapper = document.querySelectorAll('.section-favorites__btn-wrapper')
const buttonOwn = `<button disabled class="button button-own">Own</button>`

buyBtn.forEach((btn, i) => {
  btn.addEventListener('click', ()=> {
    // before auth
    if(!currentUser) {
      logInModal.classList.add('active-window')
      logInModal.classList.remove('hidden-window')
    }
    // card is not paid
    if(currentUser && !currentUser.cardIsPaid) {
      modalBuy.classList.add('active-window')
      modalBuy.classList.remove('hidden-window')
    }
    //card is paid 
    if(currentUser && currentUser.cardIsPaid) {
      btnsBuyWrapper[i].innerHTML = buttonOwn
      currentUser.rentedBooks[i] = 1
      currentUser.books++
      renderLibraryCardSectionAfterLogIn(currentUser)
      updUserDataInStorage()
    }
  })
})
/* При нажатии на любую кнопку Buy, после покупки абонемента, меняет вид кнопки на неактивную Own, добавляя единицу к счетчику книг в профиле. +2 */



/*  Блок `Digital Library Cards`. */
const checkCardBtn = document.querySelector('.button-check-card')

checkCardBtn.addEventListener('click', ()=> {
  let nameValue = document.querySelector('#name').value
  let cardNumberValue = document.querySelector('#card-number').value
  const storedAccounts = JSON.parse(localStorage.getItem('accounts'))
  storedAccounts.forEach((acc, i) => {
    if(acc.cardNumber == cardNumberValue && acc.fullName == nameValue) {
      renderStatInYourCard(acc)
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

/* LibraryCard after login in account */
function renderLibraryCardSectionAfterLogIn(acc) {
  console.log(acc);
  renderStatInYourCard(acc)
  document.querySelector('.find-your-card__title').textContent = 'Your Library card'
  document.querySelector('.button-check-card__wrapper').classList.add('hidden')
  document.querySelector('.modal-profile__info-box').classList.remove('hidden')
  document.querySelector('#name').value = `${acc.fullName}`
  document.querySelector('#card-number').value = acc.cardNumber
  let oldLibrCardSect = document.querySelector('.get-card')
  oldLibrCardSect.innerHTML = `<p class="get-card__title">Visit your profile</p>
  <p class="get-card__description text">With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.</p>
  <div class="get-card__button-box button-box">
      <button class="button button-profile my-profile-button">Profile</button>
  </div>`
  myProfileBtn = document.querySelectorAll('.my-profile-button')
  myProfileBtn.forEach(val => {
    val.addEventListener('click', ()=> {
      renderMyProfile(acc)
      modalMyProfile.classList.add('active-window')
      modalMyProfile.classList.remove('hidden-window')
    })
  })
}

