import Tabs from '../components/Tabs.js';
import Api from '../components/Api.js';

const tabs = new Tabs (
    '.navigation',
    '.tabs-content',
    'navigation__link_active',
    'tab-content_active'
);
tabs.setListeners();


const api = new Api ({
    baseUrl: 'https://api.giphy.com/v1/gifs',
    headers: {
      authorization: 'LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R',
      'Content-Type': 'application/json'
    }
});

Promise.all([api.getRandomGif()])
    .then(([randomGif]) => {
        console.log(randomGif)
    })
    .catch(err => {
        console.log(err)
        alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    });