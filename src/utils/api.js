const baseURL = "http://localhost:3001";
// const baseURL = "http://192.168.0.19:3001";

const headers = { "Content-Type": "application/json" };

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseURL}/items`, {
    headers: headers,
  }).then(handleServerResponse);
};

export const addCard = ({ name, imageUrl, weather }) => {
  return fetch(`${baseURL}/items`, {
    headers: headers,
    method: "POST",
    // Send data as a JSON string.
    body: JSON.stringify({
      name: name,
      imageUrl: imageUrl,
      weather: weather,
    }),
  }).then(handleServerResponse);
};

export const deleteCard = (itemId) => {
  return fetch(`${baseURL}/items/${itemId}`, {
    headers: headers,
    method: "DELETE",
  }).then(handleServerResponse);
};
