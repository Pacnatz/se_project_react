import { checkResponse } from "./weatherApi";

const baseURL = "http://localhost:3001";
// const baseURL = "http://192.168.0.19:3001";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const checkToken = () => {
  return fetch(`${baseURL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(checkResponse);
};

export const getItems = () => {
  return fetch(`${baseURL}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

export const addCard = ({ name, imageUrl, weather, owner }) => {
  return fetch(`${baseURL}/items`, {
    headers: getAuthHeaders(),
    method: "POST",
    // Send data as a JSON string.
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
      owner: owner,
    }),
  }).then(checkResponse);
};

export const deleteCard = (itemId) => {
  return fetch(`${baseURL}/items/${itemId}`, {
    headers: getAuthHeaders(),
    method: "DELETE",
  }).then(checkResponse);
};

export const editProfile = ({ name, avatar }) => {
  return fetch(`${baseURL}/users/me`, {
    headers: getAuthHeaders(),
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      avatar: avatar,
    }),
  }).then(checkResponse);
};

export const addCardLike = ({ itemId, token }) => {
  return fetch(`${baseURL}/items/${itemId}/likes`, {
    headers: getAuthHeaders(),
    method: "PUT",
  }).then(checkResponse);
};

export const removeCardLike = ({ itemId, token }) => {
  return fetch(`${baseURL}/items/${itemId}/likes`, {
    headers: getAuthHeaders(),
    method: "DELETE",
  }).then(checkResponse);
};
