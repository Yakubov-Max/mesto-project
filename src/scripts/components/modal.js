

import { updateSubmitButtonState } from "./utils.js";
import { api } from "../script.js"

// profile popup open/close

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
}

function closeProfilePopup() {
  closePopup(popupEdit);
  editForm.reset();
}

// image popup handler



