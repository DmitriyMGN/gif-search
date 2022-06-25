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
  '.gifs_type_trends',
  (data) => {
    const gif = createGif(data.images.original.url);
    trendsAddGif.add(gif);
  })

const searchAddGif = new AddGif(
  '.gifs_type_search',
  (data) => {
    const gif = createGif(data.images.original.url);
    searchAddGif.add(gif);
  })

function createGif(url) {
  return generateGif.generate(url)
}

const randomGif = new RandomGif({
  itemSelector: '.gifs__item_type_random'
});

const api = new Api({
  baseUrl: 'https://api.giphy.com/v1/gifs',
  key: 'LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.getRandomGif()
  .then((res) => {
    randomGif.setGif(res)
  })
  .catch(err => {
    alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
  });


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

buttonRandom.addEventListener('click', () => {
  buttonRandom.textContent = 'One moment...';
  api.getRandomGif()
    .then((res) => {
      randomGif.setGif(res);

    })
    .catch(err => {
      alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    })
    .finally(() => {
      buttonRandom.textContent = 'Get another random gif';
    })
})