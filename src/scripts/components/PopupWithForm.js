import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleSubmitForm) {
    super(popupElement);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputValues = {};

    this.popupElement.querySelectorAll(".popup__text-input").forEach((ele) => {
      this._inputValues[ele.id] = ele.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this.popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._getInputValues());
      });
  }

  close() {
    this.popupElement.querySelector(".popup__form").reset();
    super.close();
  }
}
