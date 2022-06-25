import Tabs from '../components/Tabs.js';
import Api from '../components/Api.js';
import RandomGif from '../components/RandomGif.js';
import GenerateGif from '../components/GenerateGif.js'
import AddGif from '../components/AddGif.js';

const buttonRandom = document.querySelector('.button_type_random-gif');
const buttonSearch = document.querySelector('.button_type_search');
const inputSearch = document.querySelector('.search__input');
const searchStatus = document.querySelector('.search__status');
const searchForm = document.querySelector('.search__form');

const tabs = new Tabs(
  '.navigation',
  '.tabs-content',
  'navigation__link_active',
  'tab-content_active'
);
tabs.setListeners();

const generateGif = new GenerateGif({
  templateSelector: '.template',
  gifsListSelector: '.gifs',
  gifsItemSelector: '.gifs__item'
})

const trendsAddGif = new AddGif(
  '.trends',
  (data) => {
    const gif = createGif(data.images.original.url);
    trendsAddGif.add(gif);
  })

const searchAddGif = new AddGif(
  '.search-gif',
  (data) => {
    const gif = createGif(data.images.original.url);
    searchAddGif.add(gif);
  })

function createGif(url) {
  return generateGif.generate(url)
}

const api = new Api({
  baseUrl: 'https://api.giphy.com/v1/gifs',
  key: 'LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R',
  headers: {
    'Content-Type': 'application/json'
  }
});


api.uploadGif()


const randomGif2 = new AddGif(
  '.gifs_random'
)


function setRandomGif(){
  api.getRandomGif()
  .then(res => {
    const newGif = createGif(res.data.images.original.url);
    newGif.classList.add('gifs__item_type_random');
    randomGif2.replaceGif(newGif);
  })
  .catch(err => {
    alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
  })
  .finally(() => {
    buttonRandom.textContent = 'Get another random gif';
  })
}
setRandomGif();


buttonRandom.addEventListener('click', () => {
  buttonRandom.textContent = 'One moment...';
  setRandomGif();
})





const buttonAddMyGif = document.querySelector('.button_type_add');
const tagsAddMyGif = document.querySelector('.search__input_type_add');
const fileAddMyGif = document.querySelector('.add__input');

const addMyGif = new AddGif(
  '.add',
  (data) => {
    const gif = createGif(data.images.original.url);
    searchAddGif.add(gif);
})

buttonAddMyGif.addEventListener('click', (e) => {
  e.preventDefault();
  // buttonAddMyGif.classList.add('loader')
  console.log(tagsAddMyGif.value)
  console.log(fileAddMyGif.value)

  // searchStatus.textContent = 'Please wait...'
  api.uploadGif(tagsAddMyGif.value, fileAddMyGif.value)
    .then((res) => {
      console.log(res)
      // addMyGif.renderItems(res.data)
    })
    .catch(err => {
      console.log(err)
      // alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    })
})






api.getTrends()
  .then(res => {
    trendsAddGif.renderItems(res.data)
  })
  .catch(err => {
    console.log(err)
    alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
  });

buttonSearch.addEventListener('click', (e) => {
  e.preventDefault();
  searchStatus.classList.add('search__status_active')
  searchStatus.textContent = 'Please wait...'
  api.getSearch(inputSearch.value)
    .then((res) => {
      if (res.data.length === 0) {
        console.log('~~~~~~')
        searchStatus.textContent = 'Sorry, no gifs with your name...'
      } else {
        searchStatus.classList.remove('search__status_active')
        searchAddGif.renderItems(res.data)
      }
    })
    .catch(err => {
      alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    })
})

