import '../pages/index.css';

import Tabs from '../components/Tabs.js';
import Api from '../components/Api.js';
import GenerateGif from '../components/GenerateGif.js'
import AddGif from '../components/AddGif.js';

const buttonRandom = document.querySelector('.button_type_random-gif');
const buttonSearch = document.querySelector('.button_type_search');
const inputSearch = document.querySelector('.search__input');
const searchStatus = document.querySelector('.search__status');
const searchForm = document.querySelector('.search__form');
const gifsTypeSearch = document.querySelector('.gifs_type_search');

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

const api = new Api({
  baseUrl: 'https://api.giphy.com/v1/gifs',
  key: 'LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R',
  headers: {
    'Content-Type': 'application/json'
  }
});



const randomGif2 = new AddGif(
  '.gifs_type_random'
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
let fileAddMyGifText = document.querySelector('.add__input_uploaded');
const formToAddGif = document.querySelector('.add');

const addMyGif = new AddGif(
  '.add',
  (data) => {
    const gif = createGif(data.images.original.url);
    searchAddGif.add(gif);
})

fileAddMyGif.addEventListener("change", handleFiles3, false);
function handleFiles() {
  const fileList = this.files[0].name;
  fileAddMyGifText.textContent = `${this.files[0].name}`;
}


function handleFiles3(files) {
    let file = this.files[0];
    let img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    document.querySelector('.preview').appendChild(img);

    console.log(file)

    let reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);

    // let fileUrl = reader.readAsDataURL(file);
    
    
    
    const preview2 = document.querySelector('img');
    const file2 = document.querySelector('input[type=file]').files[0];
    const reader2 = new FileReader();

    reader2.addEventListener("load", function () {
      // convert image file to base64 string
      preview2.src = reader2.result;
    }, false);

    if (file2) {
      console.log(reader2.result);
  }
}



formToAddGif.addEventListener('submit', (e) => {
  e.preventDefault();
  // buttonAddMyGif.classList.add('loader')
  console.log(tagsAddMyGif.value)
  console.log(fileAddMyGif.value)

  // const fileList2 = fileAddMyGif.files[0];
  // const fileList2 = readFile(fileAddMyGif);
  // console.log('в сабмите', toString(fileList2))
  let reader = new FileReader();
    // reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    // reader.readAsDataURL(file);

  // reader.readAsText(fileAddMyGif.files[0])

  console.log(document.querySelector('.obj'))
  
  api.uploadGif(tagsAddMyGif.value, document.querySelector('.obj').src)
    .then((res) => {
      console.log(res)
      // addMyGif.renderItems(res.data)
        
    })
    .catch(err => {
      console.log(err)
      alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    })
    .finally(() => {
      formToAddGif.reset();
      fileAddMyGifText.textContent = '';
    })
})


const buttonClearForm = formToAddGif.querySelector('.button_type_remove');

buttonClearForm.addEventListener('click', (e) => {
  e.preventDefault();
  buttonClearForm.parentElement.reset();
  fileAddMyGifText.textContent = '';
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
    e.preventDefault()
    if(gifsTypeSearch.contains(document.querySelector('.gifs__item'))) {
      const gifsArray = Array.from(gifsTypeSearch.querySelectorAll('.gifs__item'));
      gifsArray.forEach((gif) => {
        gif.remove()
      })
    }
    searchStatus.classList.add('search__status_active')
    searchStatus.textContent = 'Please wait...'
    api.getSearch(inputSearch.value)
      .then((res) => {
        if (res.data.length === 0) {
          searchStatus.textContent = 'Sorry, no gifs with your name...'
        } else {
          searchStatus.classList.remove('search__status_active')
          searchAddGif.renderItems(res.data)
          inputSearch.value = ''
        }
      })
      .catch(err => {
        alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
      })
  })


  // searchStatus.classList.add('search__status_active')
  // searchStatus.textContent = 'Please wait...'
  // api.getSearch(inputSearch.value)
  //   .then((res) => {
  //     if (res.data.length === 0) {
  //       searchStatus.textContent = 'Sorry, no gifs with your name...'
  //     } else {
  //       searchStatus.classList.remove('search__status_active')
  //       searchAddGif.renderItems(res.data)
  //     }
  //   })
  //   .catch(err => {
  //     alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
  //   })
// })

