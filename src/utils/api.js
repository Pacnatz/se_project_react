import { checkResponse } from "./weatherApi";

const baseURL = "http://localhost:3001";
// const baseURL = "http://192.168.0.19:3001";

const authHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

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

export const addCard = ({ name, imageUrl, weather }) => {
  return fetch(`${baseURL}/items`, {
    headers: authHeaders,
    method: "POST",
    // Send data as a JSON string.
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then(checkResponse);
};

export const deleteCard = (itemId) => {
  return fetch(`${baseURL}/items/${itemId}`, {
    headers: authHeaders,
    method: "DELETE",
  }).then(checkResponse);
};
