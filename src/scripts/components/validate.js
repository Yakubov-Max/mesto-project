// form validation
function showInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  validationMessage
) {
  const errorElement = formElement.querySelector(
    `.popup__error_type_${inputElement.id}`
  );

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(
    `.popup__error_type_${inputElement.id}`
  );

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function setEventListeners(
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

export function enableValidation(validationObject) {
  const formList = Array.from(
    document.querySelectorAll(validationObject.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(
      formElement,
      validationObject.inputSelector,
      validationObject.submitButtonSelector,
      validationObject.inactiveButtonClass,
      validationObject.inputErrorClass,
      validationObject.errorClass
    );
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

export function resetValidation(popup) {
  const buttonElement = popup.querySelector('.popup__save-button');
  buttonElement.classList.add('popup__save-button_disabled');
  popup.querySelectorAll(".popup__error_active").forEach((element) => {
    element.classList.remove("popup__error_active")
    element.textContent = ""
  })
  popup.querySelectorAll(".popup__text-input_error_active").forEach((element) => {
    element.classList.remove("popup__text-input_error_active")
  })
}
