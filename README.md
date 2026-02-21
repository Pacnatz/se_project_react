# WTWR (What to Wear?)

## About the Project

WTWR is a full-stack React application that helps users decide what to wear based on current weather conditions. The app fetches real-time weather data using the OpenWeather API and allows users to manage their wardrobe with a complete CRUD interface powered by an Express.js + MongoDB backend with JWT authentication.

## Features

- **User Authentication**: Secure signup and login with JWT token-based authentication
- **Real-time Weather Data**: Fetches current weather using geolocation or fallback to default coordinates
- **Dynamic Clothing Recommendations**: Displays appropriate clothing items filtered by temperature (hot, warm, or cold)
- **Full CRUD Functionality**: Create, read, update, and delete clothing items
- **Like System**: Like and unlike clothing items with real-time updates
- **Profile Management**: Edit user profile (name and avatar)
- **Protected Routes**: Route protection ensuring authenticated access to user-specific pages
- **Temperature Unit Toggle**: Switch between Fahrenheit and Celsius using React Context
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **Interactive Modals**: Add new garments, view item details, login/signup, edit profile, and confirm deletions
- **Day/Night Weather Cards**: Displays different weather card images based on time of day and weather conditions
- **Client-Side Routing**: Navigate between main page and profile using React Router
- **Token Persistence**: Automatic login on page refresh using stored JWT tokens

## Technologies Used

### Frontend

- **React 18.3.1**: Component-based UI library with hooks
- **React Router DOM 6.28.0**: Client-side routing
- **React Context API**: Global state management for temperature units
- **Vite 5.4.10**: Fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript features including async/await
- **CSS3**: Custom styling with BEM methodology

### Backend

- **Backend Repository**: https://github.com/Pacnatz/se_project_express

- **Express.js**: Node.js web application framework
- **MongoDB**: NoSQL database for data persistence
- **Mongoose**: MongoDB object modeling
- **JWT (jsonwebtoken)**: Secure user authentication
- **bcryptjs**: Password hashing
- **Fetch API**: HTTP client for API requests

### APIs & Services

- **OpenWeather API**: Real-time weather data
- **Geolocation API**: User location detection

## Installation

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Pacnatz/se_project_react.git
   cd se_project_react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your OpenWeather API key:
   - Open `src/utils/constants.js`
   - Replace the API key with your own from [OpenWeather](https://openweathermap.org/api)

### Backend Setup

1. Clone the backend repository:

   ```bash
   git clone https://github.com/Pacnatz/se_project_express.git
   cd se_project_express
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a `.env` file with your configuration (if needed)

4. Start MongoDB (if running locally):

   ```bash
   mongod
   ```

## Running the Project

### Development Mode

1. Start the Express backend (in the `se_project_express` directory):

   ```bash
   npm run dev
   ```

   Backend will run on `http://localhost:3001`

2. In a separate terminal, start the frontend (in the `se_project_react` directory):

   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:3000`

3. Open `http://localhost:3000` in your browser

### Access from Mobile Devices

1. Find your computer's IP address:

   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. Update `src/utils/api.js` and `src/utils/auth.js` with your IP:

   ```javascript
   const baseURL = "http://YOUR_IP:3000";
   ```

3. Start the backend with host binding:

   ```bash
   npm run dev
   ```

4. Access from mobile: `http://YOUR_IP:3000`

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `dist` folder.

### Deploy to GitHub Pages

```bash
npm run deploy
```

Builds and deploys the app to GitHub Pages.

## Project Structure

```
se_project_react/
├── src/
│   ├── assets/              # Images and static files
│   │   ├── day/            # Daytime weather images
│   │   └── night/          # Nighttime weather images
│   ├── components/          # React components
│   │   ├── AddItemModal/   # Modal for adding clothing items
│   │   ├── App/            # Main application component
│   │   ├── ClothesSection/ # Profile wardrobe section
│   │   ├── DeleteModal/    # Confirmation modal for deletions
│   │   ├── EditProfileModal/ # Modal for editing user profile
│   │   ├── Footer/         # Application footer
│   │   ├── Header/         # Navigation and branding
│   │   ├── ItemCard/       # Individual clothing card
│   │   ├── ItemModal/      # Item preview modal
│   │   ├── LoginModal/     # User login modal
│   │   ├── Main/           # Main page with weather and items
│   │   ├── ModalWithForm/  # Reusable modal wrapper
│   │   ├── Profile/        # User profile page
│   │   ├── ProtectedRoute/ # Route protection for authenticated users
│   │   ├── SideBar/        # Profile sidebar
│   │   ├── SignupModal/    # User registration modal
│   │   ├── ToggleSwitch/   # Temperature unit toggle
│   │   └── WeatherCard/    # Weather display card
│   ├── contexts/            # React Context providers
│   │   ├── CurrentTemperatureUnitContext.jsx
│   │   └── CurrentUserContext.jsx
│   ├── hooks/               # Custom React hooks
│   │   └── useForm.js      # Form state management hook
│   ├── utils/               # Helper functions and API calls
│   │   ├── api.js          # Backend API functions
│   │   ├── auth.js         # Authentication API functions
│   │   ├── constants.js    # App constants and config
│   │   ├── token.js        # JWT token management
│   │   └── weatherApi.js   # Weather API functions
│   └── vendor/              # Third-party CSS (fonts, normalize)
├── API_REFERENCE.md         # Complete API documentation
├── index.html
├── package.json
└── vite.config.js
```

## API Endpoints

The Express backend provides the following REST API endpoints:

### Authentication

- `POST /signup` - Register a new user
- `POST /signin` - Login user
- `GET /users/me` - Get current user (requires auth)
- `PATCH /users/me` - Update user profile (requires auth)

### Clothing Items

- `GET /items` - Fetch all clothing items
- `POST /items` - Add a new clothing item (requires auth)
- `DELETE /items/:id` - Delete an item (requires auth)

### Likes

- `PUT /items/:id/likes` - Add like to item (requires auth)
- `DELETE /items/:id/likes` - Remove like from item (requires auth)

For complete API documentation, see [API_REFERENCE.md](API_REFERENCE.md)

## Component Overview

- **App**: Main component managing application state, routing, modals, and authentication
- **Header**: Navigation bar with profile menu, add garment button, and login/signup buttons
- **Main**: Displays weather card and filtered clothing recommendations
- **Profile**: User profile page showing all wardrobe items (protected route)
- **ProtectedRoute**: HOC that redirects unauthenticated users to home page
- **LoginModal**: User login form with email and password
- **SignupModal**: User registration form with email, password, name, and avatar
- **EditProfileModal**: Form for updating user profile information
- **WeatherCard**: Shows current weather with dynamic day/night images
- **ItemCard**: Individual clothing item card with like button and click handler
- **ItemModal**: Modal for viewing item details with delete option
- **AddItemModal**: Form modal for adding new clothing items
- **DeleteModal**: Confirmation modal for item deletion
- **ModalWithForm**: Reusable modal wrapper component
- **ClothesSection**: Displays user's complete wardrobe collection
- **SideBar**: Profile sidebar with user information, edit profile button, and signout button
- **ToggleSwitch**: Temperature unit switcher (F/C)
- **Footer**: Application footer with creator info

## Key Features Explained

### Authentication & User Context

Uses React Context API to provide global access to the current user and authentication state across all components. JWT tokens are stored in localStorage for persistent sessions, and are validated on app load to restore user sessions automatically.

### Temperature Context

Uses React Context API to provide global access to the current temperature unit (Fahrenheit/Celsius) and toggle function across all components.

### Custom Form Hook

The `useForm` hook manages form state, handles input changes, validates forms, and provides reset functionality for modal forms.

### Protected Routes

The `ProtectedRoute` component checks authentication status before rendering protected pages. Unauthenticated users are redirected to the home page with the ability to redirect back after login using location state.

### Weather Filtering

Clothing items are automatically filtered based on current temperature ranges:

- Hot: > 86°F (30°C)
- Warm: 66-86°F (19-30°C)
- Cold: < 66°F (19°C)

### Modal Management

All modals are controlled through a single `activeModal` state that determines which modal is currently displayed, with ESC key support for closing.

## Future Enhancements

- ✅ ~~User authentication and multiple user profiles~~ (Completed)
- ✅ ~~Backend migration from JSON Server to Express + MongoDB~~ (Completed)
- ✅ ~~Edit profile functionality~~ (Completed)
- ✅ ~~Like/unlike clothing items~~ (Completed)
- Image upload capability with cloud storage (Cloudinary/AWS S3)
- Edit existing clothing items
- Weather forecasts for upcoming days (7-day forecast)
- Outfit suggestions based on weather and occasion
- Social features (share outfits, follow users, comments)
- Theme customization (dark mode, color schemes)
- Email verification for new accounts
- Password reset functionality
- Search and filter clothing items by tags/categories

## Live Demo

[View Live Project](https://pacnatz.github.io/se_project_react/)

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/18LmbyNBeVwe2cc4tZnPdb8BBsJ2WE8-V/view?usp=sharing), where I describe my
project and some challenges I faced while building it.

## Author

Created by Nhat Chu

## License

This project is part of the TripleTen Software Engineering Program.
