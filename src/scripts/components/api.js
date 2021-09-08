const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-1",
  headers: {
    authorization: "a09daf17-3aa6-4f0e-82ba-81e647b9b7db",
    "Content-Type": "application/json",
  },
};
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }).catch((err) => {
      console.log(err);
    }),
  });
};

export const submitProfileAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).catch((err) => {
    console.log(err);
  });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards/`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const sendCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards/`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCard = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const sendLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};
