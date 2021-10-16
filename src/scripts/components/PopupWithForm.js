import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(_popupElement, handleSubmitForm) {
    super(_popupElement);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputValues = {};

    this._popupElement.querySelectorAll(".popup__text-input").forEach((ele) => {
      this._inputValues[ele.id] = ele.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._getInputValues());
        this.close();
      });
  }

  close() {
    // this._popupElement.querySelector(".popup__text-input").reset();
    super.close();
  }
}

// отправка профиля
function submitFormProfile(evt) {
  evt.preventDefault();
  let isLoading = true;
  updateSubmitButtonState(popupEdit, isLoading);
  api
    .updateProfileInfo(nameInput.value, aboutInput.value)
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      isLoading = false;
      updateSubmitButtonState(popupEdit, isLoading);
      profileName.textContent = nameInput.value;
      profileAbout.textContent = aboutInput.value;
      closeProfilePopup();
    });
}

// форма отправки карточки
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
