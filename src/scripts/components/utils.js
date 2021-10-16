export function updateSubmitButtonState(popupElement, isLoading) {
  const saveButton = popupElement._popupElement.querySelector(".popup__save-button")
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
}
