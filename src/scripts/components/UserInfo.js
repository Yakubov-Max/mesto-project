export default class UserInfo {
  constructor(data) {
    this._nameSelector = document.querySelector(data.name);
    this._aboutSelector = document.querySelector(data.about);
    this._avatarSelector = document.querySelector(data.avatar);
  }

  getUserInfo() {
    const info = {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
    };

    return info;
  }

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._nameSelector.textContent = name;
    }
    if (about) {
      this._aboutSelector.textContent = about;
    }
    if (avatar) {
      this._avatarSelector.src = avatar;
    }
  }
}
