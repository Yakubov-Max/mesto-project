export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: this._headers,
    }).then();
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(_getResponseData);
  }

  updateProfileInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(_getResponseData);
  };

  submitProfileAvatar = (url) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(_getResponseData);
  };

  sendCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(_getResponseData);
  };

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(_getResponseData);
  };

  sendLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(_getResponseData);
  };

  deleteLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(_getResponseData);
  };
}
