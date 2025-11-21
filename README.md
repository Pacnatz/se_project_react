# WTWR (What to Wear?)

## About the Project

WTWR is a React-based weather application that helps users decide what to wear based on current weather conditions. The app fetches real-time weather data using the OpenWeather API and displays clothing recommendations based on temperature ranges.

## Features

- **Real-time Weather Data**: Fetches current weather using geolocation or default coordinates
- **Dynamic Clothing Recommendations**: Displays appropriate clothing items based on temperature (hot, warm, or cold)
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Interactive Modals**: Add new garments and view item details in modal windows
- **Day/Night Weather Cards**: Displays different weather card images based on time of day and weather conditions

## Technologies Used

- **React 18.3.1**: Component-based UI library
- **Vite**: Fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript features
- **CSS3**: Custom styling with BEM methodology
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

```bash
npm run dev
```

Opens the app at `http://localhost:3000` with hot reload enabled.

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
│   ├── assets/          # Images and static files
│   ├── components/      # React components
│   │   ├── App/
│   │   ├── Header/
│   │   ├── Main/
│   │   ├── Footer/
│   │   ├── ItemCard/
│   │   ├── ItemModal/
│   │   ├── ModalWithForm/
│   │   └── WeatherCard/
│   ├── utils/           # Helper functions and constants
│   │   ├── constants.js
│   │   └── weatherApi.js
│   └── vendor/          # Third-party CSS (fonts, normalize)
├── index.html
├── package.json
└── vite.config.js
```

## Component Overview

- **App**: Main component managing application state
- **Header**: Navigation bar with user info and add button
- **Main**: Displays weather card and clothing items
- **WeatherCard**: Shows current weather with dynamic images
- **ItemCard**: Individual clothing item card
- **ItemModal**: Modal for viewing item details
- **ModalWithForm**: Reusable modal component with form
- **Footer**: Application footer

## Future Enhancements

- User authentication and profiles
- Backend API for storing user's clothing items
- Weather forecasts for upcoming days
- Ability to edit and delete clothing items
- Theme customization

## Live Demo

[View Live Project](https://pacnatz.github.io/se_project_react/)

## Author

Created by Nhat Chu

## License

This project is part of the TripleTen Software Engineering Program.
