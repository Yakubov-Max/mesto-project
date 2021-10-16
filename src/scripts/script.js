import "../pages/index.css";
import Section from "./components/Section.js";
import Card from "./components/Card.js";
import { updateProfileInfo, submitFormAvatar } from "./components/profile.js";
import Api from "./components/Api.js";
import FormValidator from "./components/FormValidator.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";

// popup edit

// profile info
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__occupation");

// // profile info popup inputs
// const nameInput = popupEdit.querySelector(".popup__profile-name");
// const aboutInput = popupEdit.querySelector(".popup__profile-about");

// // image popup
// const editForm = popupEdit.querySelector(".popup__form");

// edit profile avatar
const popupAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);

const popupProfile = new PopupWithForm(".popup_edit", (data) => {
  api.updateProfileInfo(data.name, data.about).then((res) => {
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
  });
});

const popupAdd = new PopupWithForm(".popup_add", (data) => {
  api
    .sendCard(data.title, data.url)
    .then((res) => {
      cardList.setItem(createCard(res, cardList.profileId))
    });
});
const popupAvatar = new PopupWithForm(".popup__edit-avatar");

const imagePopup = new Popup(".popup_image");

popupProfile.setEventListeners();
popupAdd.setEventListeners();
imagePopup.setEventListeners();
popupAvatar.setEventListeners();

// open popup buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

editButton.addEventListener("click", () => {
  popupProfile.open();
});

addButton.addEventListener("click", () => {
  popupAdd.open();
});

popupAvatarContainer.addEventListener("click", () => {
  popupAvatar.open();
});

// close buttons

// const avatarForm = popupAvatar.querySelector(".popup__form");
// avatarForm.addEventListener("submit", submitFormAvatar);

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

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then((values) => {
    const [profileInfo, cardInfo] = values;
    const profileId = profileInfo._id;
    // создание карточек
    cardList.setProfileId(profileId);
    cardList.renderItems(cardInfo);

    updateProfileInfo(profileInfo);
    // fillDownloadedCards(cardInfo, profileId);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

function createCard(item, profileId) {
  const cardPopup = new PopupWithImage(".popup_image");
  const card = new Card(item, "#element", profileId, {
    handleCardClick: (name, link) => {
      cardPopup.open(name, link);
    },
  });
  const cardElement = card.generate();

  return cardElement;
}

// createCard()
