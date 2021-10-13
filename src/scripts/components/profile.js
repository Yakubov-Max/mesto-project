import { closePopup, popupAvatar } from "./modal.js";
import { updateSubmitButtonState } from "./utils.js";
import { api } from '../script.js'

const profileName = document.querySelector(".profile__name");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAbout = document.querySelector(".profile__occupation");

const avatarFormInput = document.querySelector(".popup__avatar-url");

export function updateProfileInfo(profileInfo) {
  profileAvatar.src = profileInfo.avatar;
  profileName.textContent = profileInfo.name;
  profileAbout.textContent = profileInfo.about;
}

export function submitFormAvatar(evt) {
  evt.preventDefault();
  let isLoading = true;
  const avatarUrl = avatarFormInput.value;
  updateSubmitButtonState(popupAvatar, isLoading);
  api.submitProfileAvatar(avatarUrl)
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      isLoading = false;
      updateSubmitButtonState(popupAvatar, isLoading);
      profileAvatar.src = avatarUrl;
      closePopup(popupAvatar);
    });
}
