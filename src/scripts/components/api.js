const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-1",
  headers: {
    authorization: "",
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
