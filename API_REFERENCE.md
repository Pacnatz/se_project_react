# API Reference

This document provides a complete reference for all API endpoints used in the WTWR (What to Wear?) React frontend application.

**Base URL:** `http://localhost:3000`

---

## Authentication Endpoints

### Register User

**Function:** `register()`  
**Endpoint:** `POST /signup`  
**Headers:** `Content-Type: application/json`  
**Body:**

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "avatar": "string (URL)"
}
```

**Returns:** User object with JWT token  
**Location:** `src/utils/auth.js`

---

### Login User

**Function:** `login()`  
**Endpoint:** `POST /signin`  
**Headers:** `Content-Type: application/json`  
**Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Returns:** User object with JWT token  
**Location:** `src/utils/auth.js`

---

## User Endpoints

### Check Token / Get Current User

**Function:** `checkToken()`  
**Endpoint:** `GET /users/me`  
**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer {token}`

**Returns:** Current user object  
**Location:** `src/utils/api.js`

---

### Edit Profile

**Function:** `editProfile()`  
**Endpoint:** `PATCH /users/me`  
**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer {token}`

**Body:**

```json
{
  "name": "string",
  "avatar": "string (URL)"
}
```

**Returns:** Updated user object  
**Location:** `src/utils/api.js`

---

## Clothing Items Endpoints

### Get All Items

**Function:** `getItems()`  
**Endpoint:** `GET /items`  
**Headers:** `Content-Type: application/json`  
**Returns:** Array of clothing item objects  
**Location:** `src/utils/api.js`

---

### Add Clothing Item

**Function:** `addCard()`  
**Endpoint:** `POST /items`  
**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer {token}`

**Body:**

```json
{
  "name": "string",
  "imageUrl": "string (URL)",
  "weather": "string (hot|warm|cold)",
  "owner": "string (userId)"
}
```

**Returns:** Created clothing item object  
**Location:** `src/utils/api.js`

---

### Delete Clothing Item

**Function:** `deleteCard()`  
**Endpoint:** `DELETE /items/{itemId}`  
**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer {token}`

**URL Parameters:**

- `itemId` - MongoDB ObjectId of the item to delete

**Returns:** Success message  
**Location:** `src/utils/api.js`

---

## Likes Endpoints

### Add Like to Item

**Function:** `addCardLike()`  
**Endpoint:** `PUT /items/{itemId}/likes`  
**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer {token}`

**URL Parameters:**

- `itemId` - MongoDB ObjectId of the item to like

**Returns:** Updated clothing item object with likes array  
**Location:** `src/utils/api.js`

---

### Remove Like from Item

**Function:** `removeCardLike()`  
**Endpoint:** `DELETE /items/{itemId}/likes`  
**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer {token}`

**URL Parameters:**

- `itemId` - MongoDB ObjectId of the item to unlike

**Returns:** Updated clothing item object with likes array  
**Location:** `src/utils/api.js`

---

## Authentication Helper

### Get Auth Headers

**Function:** `getAuthHeaders()`  
**Returns:**

```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {token from localStorage}"
}
```

**Location:** `src/utils/api.js`  
**Note:** Internal helper function that retrieves token fresh from localStorage for each request

---

## Response Handling

All API functions use the `checkResponse()` utility from `src/utils/weatherApi.js` to handle responses consistently. This utility:

- Checks if response is OK
- Parses JSON
- Rejects promise with error if response fails

---

## Error Handling

All endpoints return errors in the following scenarios:

- **401 Unauthorized:** Invalid or missing JWT token
- **400 Bad Request:** Invalid request body or parameters
- **404 Not Found:** Resource doesn't exist
- **500 Server Error:** Internal server error

Handle errors using `.catch()` blocks in your component code.

---

## Usage Example

```javascript
import { login } from "../utils/auth";
import { getItems, addCard } from "../utils/api";

// Login
login({ email: "user@example.com", password: "password123" })
  .then((user) => {
    localStorage.setItem("token", user.token);
  })
  .catch(console.error);

// Get items
getItems()
  .then((items) => console.log(items))
  .catch(console.error);

// Add item (requires authentication)
addCard({
  name: "Winter Jacket",
  imageUrl: "https://example.com/jacket.jpg",
  weather: "cold",
  owner: userId,
})
  .then((newItem) => console.log(newItem))
  .catch(console.error);
```
