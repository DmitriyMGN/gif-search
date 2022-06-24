import Tabs from '../components/Tabs.js';
import Api from '../components/Api.js';
import RandomGif from '../components/RandomGif.js';

const buttonRandom = document.querySelector('.button_type_random-gif');

const tabs = new Tabs (
    '.navigation',
    '.tabs-content',
    'navigation__link_active',
    'tab-content_active'
);
tabs.setListeners();


<<<<<<< HEAD
const api = new Api ('https://api.giphy.com/v1/gifs');
=======
const randomGif = new RandomGif ({
    itemSelector: '.gifs__item_type_random'
});
>>>>>>> 19af0cd2c0f25acc036b1d3c6d1ae71e511765cd

const api = new Api ({
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


// api.getTrends()
//     .then(res => {
//         console.log(res.data)
//     })
//     .catch(err => {
//         console.log(err)
//         alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
//     });



buttonRandom.addEventListener('click', () => {
    buttonRandom.textContent = 'One moment...';
    api.getRandomGif()
        .then((res) => {
            randomGif.setGif(res);
            
        })
        .catch(err => {alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)})
        .finally(() => {
            buttonRandom.textContent = 'Get another random gif';
        })
})
