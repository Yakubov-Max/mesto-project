import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(_popupElement) {
    super(_popupElement)

  }

  open(name, link) {
    const popupImage = this._popupElement.querySelector(".image-popup__image");
    const popupCaption = this._popupElement.querySelector(".image-popup__caption");
    popupImage.src = link
    popupImage.alt = name
    popupCaption.textContent = name;

    super.open();
  }
}
