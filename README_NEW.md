# WTWR (What to Wear?)

## About the Project

WTWR is a full-stack React application that helps users decide what to wear based on current weather conditions. The app fetches real-time weather data using the OpenWeather API and allows users to manage their wardrobe with a complete CRUD interface powered by a JSON Server backend.

## Features

- **Real-time Weather Data**: Fetches current weather using geolocation or fallback to default coordinates
- **Dynamic Clothing Recommendations**: Displays appropriate clothing items filtered by temperature (hot, warm, or cold)
- **Full CRUD Functionality**: Create, read, update, and delete clothing items
- **Temperature Unit Toggle**: Switch between Fahrenheit and Celsius using React Context
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **Interactive Modals**: Add new garments, view item details, and confirm deletions with modal windows
- **Day/Night Weather Cards**: Displays different weather card images based on time of day and weather conditions
- **Profile Page**: Dedicated user profile with personal wardrobe collection
- **Client-Side Routing**: Navigate between main page and profile using React Router
- **Mobile Network Support**: Access the app from mobile devices on the same network

## Technologies Used

### Frontend

- **React 18.3.1**: Component-based UI library with hooks
- **React Router DOM 6.28.0**: Client-side routing
- **React Context API**: Global state management for temperature units
- **Vite 5.4.10**: Fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript features including async/await
- **CSS3**: Custom styling with BEM methodology

### Backend

- **JSON Server 1.0.0-beta.3**: REST API for local development
- **Fetch API**: HTTP client for API requests

### APIs & Services

- **OpenWeather API**: Real-time weather data
- **Geolocation API**: User location detection

## Installation

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

## Running the Project

### Development Mode

1. Start the JSON Server backend:

   ```bash
   json-server --watch db.json --port 3001
   ```

2. In a separate terminal, start the frontend:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser

### Access from Mobile Devices

1. Find your computer's IP address:

   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. Start JSON Server on all network interfaces:

   ```bash
   json-server --watch db.json --port 3001 --host 0.0.0.0
   ```

3. Update `src/utils/api.js` with your IP:

   ```javascript
   const baseURL = "http://YOUR_IP:3001";
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
│   │   ├── Footer/         # Application footer
│   │   ├── Header/         # Navigation and branding
│   │   ├── ItemCard/       # Individual clothing card
│   │   ├── ItemModal/      # Item preview modal
│   │   ├── Main/           # Main page with weather and items
│   │   ├── ModalWithForm/  # Reusable modal wrapper
│   │   ├── Profile/        # User profile page
│   │   ├── SideBar/        # Profile sidebar
│   │   ├── ToggleSwitch/   # Temperature unit toggle
│   │   └── WeatherCard/    # Weather display card
│   ├── contexts/            # React Context providers
│   │   └── CurrentTemperatureUnitContext.jsx
│   ├── hooks/               # Custom React hooks
│   │   └── useForm.js
│   ├── utils/               # Helper functions and API calls
│   │   ├── api.js          # Backend API functions
│   │   ├── constants.js    # App constants and config
│   │   └── weatherApi.js   # Weather API functions
│   └── vendor/              # Third-party CSS (fonts, normalize)
├── db.json                  # JSON Server database
├── index.html
├── package.json
└── vite.config.js
```

## API Endpoints

The JSON Server provides the following REST API endpoints:

- `GET /items` - Fetch all clothing items
- `POST /items` - Add a new clothing item
- `GET /items/:id` - Get a specific item
- `DELETE /items/:id` - Delete an item
- `PUT /items/:id` - Update an item (for future use)
- `PATCH /items/:id` - Partially update an item (for future use)

## Component Overview

- **App**: Main component managing application state, routing, and modals
- **Header**: Navigation bar with profile menu and add garment button
- **Main**: Displays weather card and filtered clothing recommendations
- **Profile**: User profile page showing all wardrobe items
- **WeatherCard**: Shows current weather with dynamic day/night images
- **ItemCard**: Individual clothing item card with click handler
- **ItemModal**: Modal for viewing item details with delete option
- **AddItemModal**: Form modal for adding new clothing items
- **DeleteModal**: Confirmation modal for item deletion
- **ModalWithForm**: Reusable modal wrapper component
- **ClothesSection**: Displays user's complete wardrobe collection
- **SideBar**: Profile sidebar with user information
- **ToggleSwitch**: Temperature unit switcher (F/C)
- **Footer**: Application footer with creator info

## Key Features Explained

### Temperature Context

Uses React Context API to provide global access to the current temperature unit (Fahrenheit/Celsius) and toggle function across all components.

### Custom Form Hook

The `useForm` hook manages form state, handles input changes, and provides reset functionality for modal forms.

### Weather Filtering

Clothing items are automatically filtered based on current temperature ranges:

- Hot: > 86°F (30°C)
- Warm: 66-86°F (19-30°C)
- Cold: < 66°F (19°C)

### Modal Management

All modals are controlled through a single `activeModal` state that determines which modal is currently displayed, with ESC key support for closing.

## Future Enhancements

- User authentication and multiple user profiles
- Backend migration from JSON Server to Express + MongoDB
- Edit functionality for existing clothing items
- Image upload capability
- Weather forecasts for upcoming days
- Outfit suggestions based on weather
- Social features (share outfits, follow users)
- Theme customization (dark mode)

## Live Demo

[View Live Project](https://pacnatz.github.io/se_project_react/)

## Author

Created by Nhat Chu

## License

This project is part of the TripleTen Software Engineering Program.
