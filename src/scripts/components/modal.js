export {
  editButton,
  addButton,
  popupAdd,
  editForm,
  popupProfileCloseButton,
  openProfilePopup,
  openPopup,
  closePopup,
  handleImageClick,
  handlePopupEsc,
  submitFormProfile,
  closeProfilePopup,
  popupAddCloseButton,
  popupCloseButton,
  imagePopup,
};

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

const popupCloseButton = imagePopup.querySelector(".close-button");
const popup = document.querySelectorAll(".popup");

// profile popup open/close

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  openPopup(popupEdit);
}

function closeProfilePopup() {
  closePopup(popupEdit);
  editForm.reset();
}

// "add popup" open/close

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// image popup handler

function handleImageClick(evt) {
  const popupImage = document.querySelector(".image-popup__image");
  const popupCaption = document.querySelector(".image-popup__caption");

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(imagePopup);
}

// close image popup handler

popup.forEach((element) => {
  element.addEventListener("click", handleOverlayClick);
});

function handleOverlayClick(evt) {
  closePopup(evt.target);
}

function handlePopupEsc(evt) {
  if (evt.key === "Escape") {
    popup.forEach((element) => {
      closePopup(element);
    });
  }
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeProfilePopup();
}
