import { getProfileInfo, submitProfileAvatar } from "./api.js";
import { closePopup, popupAvatar } from "./modal.js";
import {updateSubmitButtonState} from "./utils.js"

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
  let avatarUrl = avatarFormInput.value;
  updateSubmitButtonState(popupAvatar)
  submitProfileAvatar(avatarUrl).finally(() => updateSubmitButtonState(popupAvatar));
  profileAvatar.src = avatarUrl;
  closePopup(popupAvatar);
}
