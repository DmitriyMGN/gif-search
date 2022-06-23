import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'

import {
  object,
  editButton,
  profileAddButton,
  profileAvatar,
  popupPlaceProfile,
  popupPlaceCard,
  popupPlaceAvatar,
  popupFormPlaceCard,
  popupName,
  popupActivity
} from '../utils/constants.js';

let userId = null;

const cardFormValidator = new FormValidator(object, popupFormPlaceCard);
const profileFormValidator = new FormValidator(object, popupPlaceProfile);
const avatarFormValidator = new FormValidator(object, popupPlaceAvatar);
const popupWithImage = new PopupWithImage('.popup_place_card-image');
const userInfo = new UserInfo('.profile__name', '.profile__activity');

const api = new Api('https://nomoreparties.co/v1/cohort-43');

const popupDeleteCard = new PopupWithConfirmation('.popup_place_card-delete')

const cardList = new Section(
  function renderer(item) {
    const card = createCard(item);
    cardList.addItem(card);
  },
  '.elements__list');

  function createCard(item) {
    const card = new Card(
      item, 
      '.template', 
      () => popupWithImage.open(item), 
      userId,
      handleRemoveCardClick,
      handleLikeClick
  );

    const cardElement = card.generateCard();
    if(card.isLiked()){
      card.addLikeElements()
    }
    
    return cardElement;
  }

  function handleRemoveCardClick (card) {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitAction(() => {
        api.deleteCard(card.getCardId())
          .then(() => {
            card.removeCard();
            popupDeleteCard.close();
          })
        .catch((err) => console.log(err))
      })
    }

  function handleLikeClick (card) {
    if(!card.isLiked()) {
      api.likeCard(card.getCardId())
        .then((data) => {
          card.addLikeElements()
          card.updateLikes(data.likes)
        })
        .catch((err => console.log(err)))
    } else {
      api.removeLike(card.getCardId())
        .then((data) => {
          card.removeLikeElements()
          card.updateLikes(data.likes)
        })
        .catch((err => console.log(err)))
    }
   
  }

const popupWithCardForm = new PopupWithForm('.popup_place_card', (item) => {
  popupWithCardForm.renderLoading(true, 'Создать', 'Cохранение...')
  api.setNewCard(item)
    .then(data => {
      popupWithCardForm.close();
      return cardList.addItem(createCard(data));
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithCardForm.renderLoading(false, 'Создать', 'Cохранение...')
    })
});

const popupWithProfileForm = new PopupWithForm('.popup_place_profile', (item) => {
  popupWithProfileForm.renderLoading(true, 'Сохранить', 'Cохранение...')
  api.setUserInfo(item)
    .then(() => {
        popupWithProfileForm.close();
        return userInfo.setUserInfo(item);
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithProfileForm.renderLoading(false, 'Сохранить', 'Cохранение...')})
});

const popupWithAvatar = new PopupWithForm('.popup_place_avatar', (item) => {
  popupWithAvatar.renderLoading(true, 'Сохранить', 'Cохранение...')
  api.updateAvatar(item.avatar)
    .then(data => {
      popupWithAvatar.close()
      return userInfo.setUserAvatar(data.avatar)
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithAvatar.renderLoading(false, 'Сохранить', 'Cохранение...')})
})

profileAvatar.addEventListener('click', function () {
  avatarFormValidator.deleteErrors();
  avatarFormValidator.disableSubmitButton();
  popupWithAvatar.open()
  }
)

editButton.addEventListener('click', function () {
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupActivity.value = data.activity;

  profileFormValidator.deleteErrors();
  popupWithProfileForm.open();
});

profileAddButton.addEventListener('click', function () {
  cardFormValidator.deleteErrors();
  cardFormValidator.disableSubmitButton();
  popupWithCardForm.open();
});


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      person: userData.name,
      job: userData.about
    });
    userId = userData._id
    userInfo.setUserAvatar(userData.avatar)

    cardList.renderItems(cards);
  })
  .catch(err => {console.log(err)});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
popupWithImage.setEventListeners();
popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupDeleteCard.setEventListeners();
popupWithAvatar.setEventListeners();