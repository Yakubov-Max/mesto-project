import { popupAdd, closePopup } from "./modal.js";
import { handleLikeClick } from "./utils.js";
import { handleImageClick } from "./modal.js";
import { getInitialCards } from "./api.js";
export { addForm, submitCard };

const addForm = popupAdd.querySelector(".popup__form");
const cardName = addForm.querySelector(".popup__add-card");
const cardLink = addForm.querySelector(".popup__add-link");
const elementsContainer = document.querySelector(".elements");

// add card function and initial cards
function createCard(cardData) {
  const cardTemplate = document.querySelector("#element").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__image").src = cardData.cardLink;
  cardElement.querySelector(".element__image").alt = cardData.cardName;
  cardElement.querySelector(".element__title").textContent = cardData.cardName;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", handleLikeClick);
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", handleImageClick);
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", handleCardDeleteClick);

  return cardElement;
}

// submit card form
function submitCard(evt) {
  evt.preventDefault();
  let cardData = {
    cardName: cardName.value,
    cardLink: cardLink.value,
  };
  const newCard = createCard(cardData);
  elementsContainer.prepend(newCard);
  addForm.reset();
  closePopup(popupAdd);
}

function handleCardDeleteClick(evt) {
  evt.target.closest(".element").remove();
}

// download and fill cards

export function fillDownloadedCards() {
  let initialCards = getInitialCards();
  initialCards.then((cards) => {
    cards.forEach((card) => {
      let cardData = {
        cardName: card.name,
        cardLink: card.link,
      };
      let downloadedCard = createCard(cardData);
      elementsContainer.prepend(downloadedCard);
    });
  });
}
