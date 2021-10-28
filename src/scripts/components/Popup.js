export default class Popup {
  constructor(_popupSelector) {
    this.popupElement = document.querySelector(_popupSelector);
  }

  open() {
    this.popupElement.classList.add("popup_opened");

    document.addEventListener(
      "keydown",
      (this._escHandler = this._handlePopupEsc.bind(this))
    );
  }

  close() {
    this.popupElement.classList.remove("popup_opened");

    document.removeEventListener("keydown", this._escHandler);
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
    this.popupElement
      .querySelector(".close-button")
      .addEventListener("click", () => {
        this.close();
      });
    this.popupElement.addEventListener("click", (evt) => {
      this._handleOverlayClick(evt);
    });
  }
}
