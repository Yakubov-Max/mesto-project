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
function createCard(cardData, removable = true) {
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
  sendCard(cardData.cardName, cardData.cardLink);
  fillDownloadedCards();
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
  initialCards.then((cards) => {
    cards.forEach((card) => {
      let cardData = {
        cardName: card.name,
        cardLink: card.link,
        cardId: card._id,
        cardLikes: card.likes.length,
        liked: false,
      };
      // check card owner id and profile id
      getProfileInfo().then((profileInfo) => {
        card.likes.forEach((user) => {
          if (user._id === profileInfo._id) {
            cardData.liked = true;
          }
        });
        let downloadedCard;
        if ((profileInfo._id = card.owner._id)) {
          downloadedCard = createCard(cardData, true);
        } else {
          downloadedCard = createCard(cardData, false);
        }
        elementsContainer.prepend(downloadedCard);
      });
    });
  });
}
