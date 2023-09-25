const clearBtn = document.querySelector('.clear-btn')
const input = document.querySelector('.search-input')
const imageContainer = document.querySelector('.image-container')
const listItemsArray = document.querySelectorAll('.list-item')

/* clear search */
clearBtn.addEventListener('click', ()=> {
  input.value = ''
})


/* API */
let url = 'https://api.unsplash.com/search/photos?query=winter&per_page=18&orientation=landscape&client_id=j5Yspgdlp2VF8Zac_gnLgdx9eeKKn-WA9RJ6rNlsUms'
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data)
}
getData();

function showData(data) {
  const dataArray = data.results
  dataArray.map(el => {
    const img = `<img class="gallery-img" src="${el.urls.small}" alt="image">`;
    imageContainer.insertAdjacentHTML('beforeend', img);
  })
}

function clearGallery() {
  imageContainer.innerHTML = ''
}

/* search by user */
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter' && input.value !== '') {
    clearGallery()
    let query = input.value
    url = `https://api.unsplash.com/search/photos?query=${query}&per_page=18&orientation=landscape&client_id=j5Yspgdlp2VF8Zac_gnLgdx9eeKKn-WA9RJ6rNlsUms`
    getData()
  }
})

/* search by default key words */
listItemsArray.forEach(el => {
  el.addEventListener('click', ()=> {
    clearGallery()
    url = `https://api.unsplash.com/search/photos?query=${el.innerText}&per_page=18&orientation=landscape&client_id=j5Yspgdlp2VF8Zac_gnLgdx9eeKKn-WA9RJ6rNlsUms`
    getData()
  })
})
