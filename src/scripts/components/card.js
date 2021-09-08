import { popupAdd, closePopup } from "./modal.js";
import { handleLikeClick } from "./utils.js";
import { handleImageClick } from "./modal.js";
import {
  getInitialCards,
  getProfileInfo,
  sendCard,
  deleteCard,
} from "./api.js";
export { addForm, submitCard };

const addForm = popupAdd.querySelector(".popup__form");
const cardName = addForm.querySelector(".popup__add-card");
const cardLink = addForm.querySelector(".popup__add-link");
const elementsContainer = document.querySelector(".elements");

// add card function and initial cards
function createCard(cardData, removable = false) {
  const cardTemplate = document.querySelector("#element").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__image").src = cardData.cardLink;
  cardElement.querySelector(".element__image").alt = cardData.cardName;
  cardElement.setAttribute("id", cardData.cardId);
  cardElement.querySelector(".element__title").textContent = cardData.cardName;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", handleLikeClick);
  if (cardData.liked) {
    cardElement
      .querySelector(".element__like-button")
      .classList.add("element__like-button_active");
  }
  cardElement.querySelector(".element__like-count").textContent =
    cardData.cardLikes;
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", handleImageClick);
  if (removable) {
    cardElement.querySelector(".element__delete-button").style.display = "none";
  } else {
    cardElement
      .querySelector(".element__delete-button")
      .addEventListener("click", handleCardDeleteClick);
  }
  return cardElement;
}

// submit card form
function submitCard(evt) {
  evt.preventDefault();
  let cardData = {
    cardName: cardName.value,
    cardLink: cardLink.value,
  };

  let cardToSubmit = sendCard(cardData.cardName, cardData.cardLink);
  cardToSubmit
    .then((card) => {
      let cardData = extractCardData(card);
      let submitedCard = createCard(cardData, true);
      elementsContainer.prepend(submitedCard);
    })
    .catch((err) => console.log(err));
  addForm.reset();
  closePopup(popupAdd);
}

function handleCardDeleteClick(evt) {
  const element = evt.target.closest(".element");
  deleteCard(element.id);
  element.remove();
}

// download and fill cards

export function fillDownloadedCards() {
  let initialCards = getInitialCards();
  initialCards
    .then((cards) => {
      cards.forEach((card) => {
        let cardData = extractCardData(card);
        // check card owner id and profile id
        getProfileInfo()
          .then((profileInfo) => {
            card.likes.forEach((user) => {
              if (user._id === profileInfo._id) {
                cardData.liked = true;
              }
            });
            let downloadedCard;
            if (profileInfo._id === card.owner._id) {
              downloadedCard = createCard(cardData, false);
            } else {
              downloadedCard = createCard(cardData, true);
            }
            elementsContainer.prepend(downloadedCard);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
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
