import { getProfileInfo } from "./api.js";

const profileName = document.querySelector(".profile__name");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAbout = document.querySelector(".profile__occupation");

export function updateProfileInfo() {
  let profileInfo = getProfileInfo();
  profileInfo.then((profileInfo) => {
    profileAvatar.src = profileInfo.avatar;
    profileName.textContent = profileInfo.name;
    profileAbout.textContent = profileInfo.about;
  });
}
