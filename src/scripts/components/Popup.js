export default class Popup {
  constructor(_popupSelector) {
    this._popupElement = document.querySelector(_popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => {
      this._handlePopupEsc(evt);
    });
  }

  _handlePopupEsc(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".close-button")
      .addEventListener("click", () => {
        this.close();
      });
    this._popupElement.addEventListener("click", (evt) => {
      this._handleOverlayClick(evt);
    });
    document.addEventListener("keydown", (evt) => {
      this._handlePopupEsc(evt);
    });
  }
}
