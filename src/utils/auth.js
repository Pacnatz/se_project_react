const BASE_URL = "http://localhost:3001";

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(new Error("Invalid credentials"));
  });
};

export const register = ({ email, password, name, avatar }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(new Error("Registration failed"));
  });
};
