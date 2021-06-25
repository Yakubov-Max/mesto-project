// popup edit
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_edit");
const popupProfileCloseButton = popupEdit.querySelector(".close-button");

// popup add
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_add");
const popupAddCloseButton = popupAdd.querySelector(".close-button");

// profile info
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__occupation");

// profile info popup inputs
const nameInput = popupEdit.querySelector(".popup__profile-name");
const aboutInput = popupEdit.querySelector(".popup__profile-about");

// image popup
const editForm = popupEdit.querySelector(".popup__form");
const imagePopup = document.querySelector(".popup_image");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// profile popup open/close

popupProfileCloseButton.addEventListener("click", closeProfilePopup);

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupEdit.classList.add("popup_opened");
}

function closeProfilePopup() {
  popupEdit.classList.remove("popup_opened");
  editForm.reset();
}

// "add popup" open/close

addButton.addEventListener("click", openPopup);
editButton.addEventListener("click", openPopup);
popupAddCloseButton.addEventListener("click", closePopup);

function openPopup(evt) {
  if (evt.target.classList.contains("profile__edit-button")) {
    openProfilePopup();
  } else if (evt.target.classList.contains("profile__add-button")) {
    popupAdd.classList.add("popup_opened");
  } else {
    imagePopup.classList.add("popup_opened");
  }
}

function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup_opened");
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeProfilePopup();
}

editForm.addEventListener("submit", submitFormProfile);

// add card function and initial cards

const elementsContainer = document.querySelector(".elements");

function createCard(name, link) {
  const cardTemplate = document.querySelector("#element").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__image").alt = name;
  cardElement.querySelector(".element__title").textContent = name;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", handleLikeClick);
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", handleImageClick);
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", handleCardDeleteClick);

  return cardElement;
}

// submit card form

const addForm = popupAdd.querySelector(".popup__form");
const cardName = addForm.querySelector(".popup__add-card");
const cardLink = addForm.querySelector(".popup__add-link");

function submitCard(evt) {
  evt.preventDefault();
  const elementsContainer = document.querySelector(".elements");
  const newCard = createCard(cardName.value, cardLink.value);
  elementsContainer.prepend(newCard);
  cardName.value = "";
  cardLink.value = "";
  closePopup(evt);
}

addForm.addEventListener("submit", submitCard);

// fill cards from InitialCards

for (let index = 0; index < initialCards.length; index++) {
  const defaultCard = createCard(
    initialCards[index].name,
    initialCards[index].link
  );
  elementsContainer.prepend(defaultCard);
}

// like button handler

function handleLikeClick(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

// image popup handler

function handleImageClick(evt) {
  const popupImage = document.querySelector(".image-popup__image");
  const popupCaption = document.querySelector(".image-popup__caption");

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(evt);
}

// close image popup handler

const popupCloseButton = imagePopup.querySelector(".close-button");
popupCloseButton.addEventListener("click", closePopup);

function handleCardDeleteClick(evt) {
  evt.target.closest(".element").remove();
}
