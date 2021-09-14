import "../pages/index.css";

import { submitCard, addForm, fillDownloadedCards } from "./components/card.js";
import {
  editForm,
  submitFormProfile,
  addButton,
  editButton,
  openProfilePopup,
  popupAddCloseButton,
  popupCloseButton,
  popupProfileCloseButton,
  closeProfilePopup,
  closePopup,
  openPopup,
  imagePopup,
  popupAdd,
  popupAvatar,
  popupAvatarContainer,
  popupAvatarCloseButton,
  avatarForm,
  popupEdit,
} from "./components/modal.js";
import { enableValidation, resetValidation } from "./components/validate.js";
import { updateProfileInfo, submitFormAvatar } from "./components/profile.js";
import { getProfileInfo, getInitialCards } from "./components/api.js";

editForm.addEventListener("submit", submitFormProfile);
addForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => {
  resetValidation(popupAdd);
  openPopup(popupAdd);
});
editButton.addEventListener("click", () => {
  openProfilePopup();
  resetValidation(popupEdit);
});
popupAddCloseButton.addEventListener("click", () => closePopup(popupAdd));
popupCloseButton.addEventListener("click", () => closePopup(imagePopup));
popupProfileCloseButton.addEventListener("click", closeProfilePopup);
popupAvatarContainer.addEventListener("click", () => openPopup(popupAvatar));
popupAvatarCloseButton.addEventListener("click", () => closePopup(popupAvatar));
avatarForm.addEventListener("submit", submitFormAvatar);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__text-input_error_active",
  errorClass: "popup__error_active",
});

Promise.all([getProfileInfo(), getInitialCards()])
  .then((values) => {
    const [profileInfo, cardInfo] = values;
    const profileId = profileInfo._id;
    updateProfileInfo(profileInfo);
    fillDownloadedCards(cardInfo, profileId);
  })
  .catch(err => console.log(`Ошибка: ${err}`));
