import { api } from "../script.js";

export default class Card {
  constructor(data, cardSelector, profileId, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._liked = data.liked;
    this._owner = data.owner;
    this._profileId = profileId;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".element__image");

    const cardLikeButton = this._element.querySelector(".element__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element.setAttribute("id", this._id);
    this._element.querySelector(".element__title").textContent = this._name;

    this._likes.forEach((user) => {
      this._liked = user._id === this._profileId;
    });

    if (this._liked) {
      cardLikeButton.classList.add("element__like-button_active");
    }

    this._element.querySelector(".element__like-count").textContent =
      this._likes.length;

    if (this._owner._id != this._profileId) {
      this._element.querySelector(".element__delete-button").style.display =
        "none";
    }

    return this._element;
  }

  _setEventListeners() {
    if (this._owner) {
      this._element
        .querySelector(".element__delete-button")
        .addEventListener("click", () => {
          this._handleCardDeleteClick();
        });
    }

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    const cardImage = this._element.querySelector(".element__image");

    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleCardDeleteClick() {
    api
      .deleteCard(this._id)
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => this._element.remove());
  }

  _handleLikeClick() {
    const cardId = this._id;
    const likeButton = this._element.querySelector(".element__like-button");

    if (likeButton.classList.contains("element__like-button_active")) {
      likeButton.classList.remove("element__like-button_active");
      api
        .deleteLike(cardId)
        .then((res) => this._updateLikeCount(cardId, res))
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      likeButton.classList.add("element__like-button_active");
      api
        .sendLike(cardId)
        .then((res) => this._updateLikeCount(cardId, res))
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }

  _updateLikeCount(cardId, res) {
    document
      .getElementById(cardId)
      .querySelector(".element__like-count").textContent = res.likes.length;
  }
}
