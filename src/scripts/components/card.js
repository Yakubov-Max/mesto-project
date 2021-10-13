import { popupAdd, closePopup } from "./modal.js";
import { updateSubmitButtonState } from "./utils.js";
import { handleImageClick } from "./modal.js";
import { api } from "../script.js"
export { addForm, submitCard };

const addForm = popupAdd.querySelector(".popup__form");
const cardName = addForm.querySelector(".popup__add-card");
const cardLink = addForm.querySelector(".popup__add-link");
const elementsContainer = document.querySelector(".elements");

// add card function and initial cards
function createCard(cardData, removable = false) {
  const cardTemplate = document.querySelector("#element").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardLikeButton = cardElement.querySelector(".element__like-button");
  cardImage.src = cardData.cardLink;
  cardImage.alt = cardData.cardName;
  cardElement.setAttribute("id", cardData.cardId);
  cardElement.querySelector(".element__title").textContent = cardData.cardName;
  cardLikeButton.addEventListener("click", handleLikeClick);
  if (cardData.liked) {
    cardLikeButton.classList.add("element__like-button_active");
  }
  cardElement.querySelector(".element__like-count").textContent =
    cardData.cardLikes;
  cardImage.addEventListener("click", handleImageClick);
  if (removable) {
    cardElement
      .querySelector(".element__delete-button")
      .addEventListener("click", handleCardDeleteClick);
  } else {
    cardElement.querySelector(".element__delete-button").style.display = "none";
  }
  return cardElement;
}

// submit card form
function submitCard(evt) {
  evt.preventDefault();
  let isLoading = true;
  const cardData = {
    cardName: cardName.value,
    cardLink: cardLink.value,
  };
  updateSubmitButtonState(popupAdd, isLoading);
  const cardToSubmit = api.sendCard(cardData.cardName, cardData.cardLink);
  cardToSubmit
    .then((card) => {
      const cardData = extractCardData(card);
      const submitedCard = createCard(cardData, true);
      elementsContainer.prepend(submitedCard);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      addForm.reset();
      closePopup(popupAdd);
      isLoading = false;
      updateSubmitButtonState(popupAdd, isLoading);
    });
}

function handleCardDeleteClick(evt) {
  const element = evt.target.closest(".element");
  api.deleteCard(element.id)
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => element.remove());
}

// download and fill cards

export function fillDownloadedCards(initialCards, profileId) {
  initialCards.forEach((card) => {
    const cardData = extractCardData(card);
    card.likes.forEach((user) => {
      if (user._id === profileId) {
        cardData.liked = true;
      }
    });
    let downloadedCard;
    profileId === card.owner._id
      ? (downloadedCard = createCard(cardData, true))
      : (downloadedCard = createCard(cardData, false));
    elementsContainer.prepend(downloadedCard);
  });
}

function extractCardData(card) {
  return {
    cardName: card.name,
    cardLink: card.link,
    cardId: card._id,
    cardLikes: card.likes.length,
    liked: false,
  };
}

function handleLikeClick(evt) {
  const cardId = evt.target.closest(".element").id;

  if (evt.target.classList.contains("element__like-button_active")) {
    evt.target.classList.remove("element__like-button_active");
    api.deleteLike(cardId)
      .then((cardData) => updateLikeCount(cardId, cardData.likes))
      .catch((err) => console.log(`Ошибка: ${err}`));
  } else {
    evt.target.classList.add("element__like-button_active");
    api.sendLike(cardId)
      .then((cardData) => updateLikeCount(cardId, cardData.likes))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
}

function updateLikeCount(cardId, likesArr) {
  document
    .getElementById(cardId)
    .querySelector(".element__like-count").textContent = likesArr.length;
}
