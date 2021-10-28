export default class FormValidator {
  constructor(options, selector) {
    this._formSelector = selector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  enableValidation() {
    this._formElement = this._formSelector;
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.popup__error_type_${inputElement.id}`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.popup__error_type_${inputElement.id}`
    );

    inputElement.classList.add(this._inputErrorClass);
    const validationMessage = inputElement.validationMessage;
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
      this._buttonElement.classList.remove("ele-hover");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
      this._buttonElement.classList.add("ele-hover");
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

export function resetValidation(popup) {
  const buttonElement = popup.querySelector(".popup__save-button");
  buttonElement.classList.add("popup__save-button_disabled");
  popup.querySelectorAll(".popup__error_active").forEach((element) => {
    element.classList.remove("popup__error_active");
    element.textContent = "";
  });
  popup
    .querySelectorAll(".popup__text-input_error_active")
    .forEach((element) => {
      element.classList.remove("popup__text-input_error_active");
    });
}
