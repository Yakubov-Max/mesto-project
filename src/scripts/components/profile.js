import { getProfileInfo, submitProfileAvatar } from "./api.js";
import { closePopup, popupAvatar } from "./modal.js";

const profileName = document.querySelector(".profile__name");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAbout = document.querySelector(".profile__occupation");

const avatarFormInput = document.querySelector(".popup__avatar-url");

export function updateProfileInfo() {
  let profileInfo = getProfileInfo();
  profileInfo.then((profileInfo) => {
    profileAvatar.src = profileInfo.avatar;
    profileName.textContent = profileInfo.name;
    profileAbout.textContent = profileInfo.about;
  });
}

export function submitFormAvatar(evt) {
  evt.preventDefault();
  let avatarUrl = avatarFormInput.value;
  profileAvatar.src = avatarUrl;
  submitProfileAvatar(avatarUrl);
  closePopup(popupAvatar);
}
