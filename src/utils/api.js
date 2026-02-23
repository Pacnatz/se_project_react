import { checkResponse } from "./weatherApi";

const baseURL = "http://localhost:3001";
// const baseURL = "http://192.168.0.19:3001";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const request = (url, options) => {
  return fetch(`${baseURL}${url}`, options).then(checkResponse);
};

export const checkToken = () => {
  return request("/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getItems = () => {
  return request("/items", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addCard = ({
  clothingItemName,
  clothingItemURL,
  weather,
  owner,
}) => {
  return request("/items", {
    headers: getAuthHeaders(),
    method: "POST",
    // Send data as a JSON string.
    body: JSON.stringify({
      name: clothingItemName,
      imageUrl: clothingItemURL,
      weather: weather,
      owner: owner,
    }),
  });
};

export const deleteCard = (itemId) => {
  return request(`/items/${itemId}`, {
    headers: getAuthHeaders(),
    method: "DELETE",
  });
};

export const editProfile = ({ name, avatar }) => {
  return request(`/users/me`, {
    headers: getAuthHeaders(),
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      avatar: avatar,
    }),
  });
};

export const addCardLike = ({ itemId }) => {
  return request(`/items/${itemId}/likes`, {
    headers: getAuthHeaders(),
    method: "PUT",
  });
};

export const removeCardLike = ({ itemId }) => {
  return request(`/items/${itemId}/likes`, {
    headers: getAuthHeaders(),
    method: "DELETE",
  });
};
