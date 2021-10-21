import "../pages/index.css";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import Api from "./components/Api.js";
import FormValidator from "./components/FormValidator.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { updateSubmitButtonState } from "./components/utils.js";

const popupAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);

const popupProfile = new PopupWithForm(".popup_edit", (data) => {
  let isLoading = true;
  updateSubmitButtonState(popupProfile, isLoading);
  api
    .updateProfileInfo(data.name, data.about)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .finally(() => {
      isLoading = false;
      updateSubmitButtonState(popupProfile, isLoading);
    });
});

const popupAdd = new PopupWithForm(".popup_add", (data) => {
  let isLoading = true;
  updateSubmitButtonState(popupAdd, isLoading);
  api
    .sendCard(data.title, data.url)
    .then((res) => {
      cardList.setItem(createCard(res, cardList.profileId));
      popupAdd.close();
    })
    .finally(() => {
      isLoading = false;
      updateSubmitButtonState(popupAdd, isLoading);
    });
});
const popupAvatar = new PopupWithForm(".popup__edit-avatar", (data) => {
  let isLoading = true;
  updateSubmitButtonState(popupAvatar, isLoading);

  api
    .submitProfileAvatar(data.url)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .finally(() => {
      isLoading = false;
      updateSubmitButtonState(popupAvatar, isLoading);
    });
});

const imagePopup = new PopupWithImage(".popup_image");

popupProfile.setEventListeners();
popupAdd.setEventListeners();
imagePopup.setEventListeners();
popupAvatar.setEventListeners();

// open popup buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

editButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  document.querySelector(".popup__profile-name").value = info.name;
  document.querySelector(".popup__profile-about").value = info.about;

  popupProfile.open();
});

addButton.addEventListener("click", () => {
  popupAdd.open();
});

popupAvatarContainer.addEventListener("click", () => {
  popupAvatar.open();
});

document.querySelectorAll(".popup__form").forEach((ele) => {
  const validate = new FormValidator(
    {
      formSelector: ".popup__form",
      inputSelector: ".popup__text-input",
      submitButtonSelector: ".popup__save-button",
      inactiveButtonClass: "popup__save-button_disabled",
      inputErrorClass: "popup__text-input_error_active",
      errorClass: "popup__error_active",
    },
    ele
  );

  validate.enableValidation();
});

export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-1",
  headers: {
    authorization: "a09daf17-3aa6-4f0e-82ba-81e647b9b7db",
    "Content-Type": "application/json",
  },
});

const cardList = new Section(
  {
    renderer: (item, profileId) => {
      const card = createCard(item, profileId);
      cardList.setItem(card);
    },
  },
  document.querySelector(".elements")
);

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__occupation",
  avatar: ".profile__avatar",
});

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then((values) => {
    const [profileInfo, cardInfo] = values;
    const profileId = profileInfo._id;
    cardList.setProfileId(profileId);
    cardList.renderItems(cardInfo);

    userInfo.setUserInfo(profileInfo);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

const cardPopup = new PopupWithImage(".popup_image");

function createCard(item, profileId) {
  const card = new Card(item, "#element", profileId, {
    handleCardClick: (name, link) => {
      cardPopup.open(name, link);
    },
  });
  const cardElement = card.generate();

  return cardElement;
}
