export function updateSubmitButtonState(popupElement) {
  const saveButton = popupElement.querySelector(".popup__save-button")
  if (saveButton.value === "Сохранить") {
    saveButton.value = "Сохранение..."
  } else {
    saveButton.value = "Сохранить"
  }
}
