import Tabs from '../components/Tabs.js';
import Api from '../components/Api.js';

const tabs = new Tabs (
    '.navigation',
    '.tabs-content',
    'navigation__link_active',
    'tab-content_active'
);
tabs.setListeners();


const api = new Api ();

// Promise.all([api.getRandomGif()])
//     .then(([randomGif]) => {
//         console.log(randomGif)
//     })
    // .catch(err => {
    //     console.log(err)
    //     alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    // });

api.getTrends()
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
        alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    });
