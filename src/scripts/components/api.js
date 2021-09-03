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
  }).then((res) => res.json());
};

export const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    }),
  });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards/`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => res.json());
};

export const sendCard = (name, link) => {
  fetch(`${config.baseUrl}/cards/`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

export const deleteCard = (id) => {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers
  })
}

