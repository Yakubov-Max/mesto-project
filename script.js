// popup edit
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit')
const popupEditCloseButton = popupEdit.querySelector('.close-button')

// popup add
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add')
const popupAddCloseButton = popupAdd.querySelector('.close-button')

// profile info
const profileName = document.querySelector('.profile__name')
const profileAbout = document.querySelector('.profile__occupation')

// profile info popup inputs
const nameInput = popupEdit.querySelector('.popup__profile-name')
const aboutInput = popupEdit.querySelector('.popup__profile-about')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// "edit popup" open/close

editButton.addEventListener('click', openEditPopup);
popupEditCloseButton.addEventListener('click', closeEditPopup);

function openEditPopup() {
  popupEdit.classList.add("popup_opened")
};

function closeEditPopup() {
  popupEdit.classList.remove("popup_opened")
  nameInput.value = ''
  aboutInput.value = ''
}

// "add popup" open/close

addButton.addEventListener('click', openAddPopup);
popupAddCloseButton.addEventListener('click', closeAddPopup);

function openAddPopup() {
  popupAdd.classList.add("popup_opened")
};

function closeAddPopup() {
  popupAdd.classList.remove("popup_opened")
}

// Popup edit name/occupation placeholder

nameInput.placeholder = profileName.textContent
aboutInput.placeholder = profileAbout.textContent


// save profile info

const editForm = popupEdit.querySelector('.popup__form');

function saveProfileInfo (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
}

editForm.addEventListener('submit', saveProfileInfo);

// add card function and initial cards

const elementsContainer = document.querySelector('.elements')

function addCard(name, link) {
  elementsContainer.insertAdjacentHTML("afterbegin", `
  <article class="element">
    <button type="button" class="element__delete-button ele-hover" aria-label="удалить"></button>
    <img src="${link}" alt="${name}" class="element__image" />
    <div class="element__sub-box">
      <h3 class="element__title">${name}</h3>
      <button type="button" class="element__like-button ele-hover" aria-label="лайк"></button>
    </div>
    <div class="image-popup">
      <button class="close-button"></button>
      <figure class="image-popup__figure">
        <img src='${link}' alt="${name}" class="image-popup__image" />
        <figcaption class="image-popup__caption">${name}</figcaption>
      </figure>
    </div>
  </article>
  `)
};

for (let index = 0; index < initialCards.length; index++) {
  addCard(initialCards[index].name, initialCards[index].link);
}

// add cards from form

const addForm = popupAdd.querySelector('.popup__form')
const cardName = addForm.querySelector('.popup__add-card')
const cardLink = addForm.querySelector('.popup__add-link')

function submitCard (evt) {
    evt.preventDefault();
    addCard(cardName.value, cardLink.value)
    cardName.value = ''
    cardLink.value = ''
}

addForm.addEventListener('submit', submitCard);

// like feature

const likeButtons = document.querySelectorAll('.element__like-button');

likeButtons.forEach(like => like.addEventListener('click', () => like.classList.toggle('element__like-button_active')))

// remove card

const deleteButtons = document.querySelectorAll('.element__delete-button')

deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', () => deleteButton.parentNode.remove()))

// image popup

const images = document.querySelectorAll('.element__image')

images.forEach(image => image.addEventListener('click', () => image.parentNode.querySelector('.image-popup').classList.add('image-popup_opened')))
