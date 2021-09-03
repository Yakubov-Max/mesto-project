import "../pages/index.css";

import { submitCard, addForm } from "./components/card.js";
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
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";

editForm.addEventListener("submit", submitFormProfile);
addForm.addEventListener("submit", submitCard);
addButton.addEventListener("click", () => openPopup(popupAdd));
editButton.addEventListener("click", openProfilePopup);
popupAddCloseButton.addEventListener("click", () => closePopup(popupAdd));
popupCloseButton.addEventListener("click", () => closePopup(imagePopup));
popupProfileCloseButton.addEventListener("click", closeProfilePopup);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__text-input_error_active",
  errorClass: "popup__error_active",
});
