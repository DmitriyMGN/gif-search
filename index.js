import '../pages/index.css';

import { Api } from '../components/Api.js';
import { Api2 } from '../components/Api2.js';
import {
        buttonEditProfile, 
        nameInput, 
        jobInput, 
        buttonAddCard, 
        forms, 
        formEditProfile,
        buttonEditAvatar,
        formAddCard,
        formsData,
        formEditAvatar,
        } from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';


const api2 = new Api2 ({
    baseUrl: 'https://api.giphy.com/v1/gifs',
    headers: {
    //   authorization: 'LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R',
      'Content-Type': 'application/json'
    }
});

// api2.getRandomGif()
//     .then((randomGif) => {
//         console.log(randomGif)
//     })
//     .catch(err => {
//         console.log(err)
//         alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
//     });


api2.uploadGif()








const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
    headers: {
      authorization: 'a8aa5636-0a20-425d-9a78-90b6247fe762',
      'Content-Type': 'application/json'
    }
});

const cardsList = new Section(
    {
        renderer: (card, userId) => {            
            cardsList.addItem(createCard(card, userId));
        },
    },

    '.cards'    
);


Promise.all([api.getInitialCards(), api.getProfileInfo()])
    .then(([initialCards, info]) => {
        profileInfo.setUserInfo(info);

        cardsList.renderItems(initialCards.reverse(), info._id);
    })
    .catch(err => alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`));


const profileInfo = new UserInfo(
    {
        nameSelector: '.profile__name',
        infoSelector: '.profile__description',
        avatarSelector: '.profile__img'
    }
);


const popupEditProfile = new PopupWithForm(
    '#edit-profile-popup',
    ({name, about}) => {
        api.changeProfileInfo({name, about})
            .then((res) => {
                profileInfo.setUserInfo(res);                
                popupEditProfile.close();
            })
            .catch(err => alert(`${err}, Попробуйте еще раз`))
            .finally(() => {
                popupEditProfile.toggleButtonText('Сохранить');
            })
    }
);
popupEditProfile.setEventListeners();




const popupEditAvatar = new PopupWithForm(
    '#edit-avatar-popup',
    ({avatar}) => {
        api.changeProfileAvatar({avatar})
        .then((res) => {
            profileInfo.setUserInfo(res);
            popupEditAvatar.close();
            
        })
        .catch(err => alert(`${err}, Попробуйте еще раз`))
        .finally(() => {
            popupEditAvatar.toggleButtonText('Сохранить');
        })
    }
);
popupEditAvatar.setEventListeners();



const popupAddCard = new PopupWithForm(
    '#add-foto-popup',
    ({name, link}) => {
        api.createNewCard({name, link})
            .then((res) => {
                cardsList.addItem(createCard(res, profileInfo.userId));
                popupAddCard.close();
            })
            .catch(err => alert(`${err}, Попробуйте еще раз`))
            .finally(() => {
                popupAddCard.toggleButtonText('Создать');
            })
    }
);
popupAddCard.setEventListeners();



const imagePopup = new PopupWithImage('#foto-popup');
imagePopup.setEventListeners();   

const formCard = new FormValidator(formsData, formAddCard);
formCard.activateValidation();

const formProfile = new FormValidator(formsData, formEditProfile);
formProfile.activateValidation();

const formAvatar = new FormValidator(formsData, formEditAvatar);
formAvatar.activateValidation();




const popupDeleteCard = new PopupDeleteCard(
    '#delete-card-popup',
    (newCard) => {
        api.deleteCard(newCard._id)
            .then(() => {
                newCard.remove();
                popupDeleteCard.close();
            })
            .catch(err => alert(`${err}, Попробуйте еще раз`))
            .finally(() => {
                popupDeleteCard.toggleButtonText('Да');
            })
    }
);
popupDeleteCard.setEventListeners();


function createCard(data, userId){

    const newCard = new Card(
        {
            card: data, 
            userId: userId,
            temlateSelector: '#card-template', 
            handleCardClick: (name, link) => {
                imagePopup.open(name, link)
            },
            handleCardLike: (id, method) => {
                api.setCardLike(id, method)
                    .then((res) => {
                        newCard.setLikeCounter(res)
                    })
                    .catch(err => alert(`${err}, Попробуйте еще раз`));
            },
            handleCardDelete: (newCard) => {
                popupDeleteCard.setCardtoDelete(newCard);
                popupDeleteCard.open();
            },
        }
    );
    const cardElement = newCard.generateCard(data);
    
    return cardElement;
};




buttonAddCard.addEventListener('click', function () {
    formCard.resetValidation();

    popupAddCard.open();
});


buttonEditProfile.addEventListener('click', function () {
    const { name, info } = profileInfo.getUserInfo();

    nameInput.value = name;
    jobInput.value = info;

    formProfile.resetValidation();
    popupEditProfile.open();
});


buttonEditAvatar.addEventListener('click', function () {
    formAvatar.resetValidation();

    popupEditAvatar.open();
});
