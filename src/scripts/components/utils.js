// like button handler

import { sendLike, deleteLike,} from "./api.js";

export function handleLikeClick(evt) {
  const cardId = evt.target.closest(".element").id

  if (evt.target.classList.contains("element__like-button_active")) {
    evt.target.classList.remove("element__like-button_active");
    deleteLike(cardId)
  } else {
    evt.target.classList.add("element__like-button_active");
    sendLike(cardId)
  }
}
