import "../pages/index.css";

import { submitCard, addForm, fillDownloadedCards } from "./components/card.js";
import {
  editForm,
  submitFormProfile,
  handlePopupEsc,
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
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { updateProfileInfo, submitFormAvatar } from "./components/profile.js";

editForm.addEventListener("submit", submitFormProfile);
document.addEventListener("keydown", handlePopupEsc);
addForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => openPopup(popupAdd));
editButton.addEventListener("click", openProfilePopup);
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

updateProfileInfo();
fillDownloadedCards();
