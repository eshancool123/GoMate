# GoMate - Travel & Transport Mobile App

## 📱 About
GoMate is a cross-platform mobile application built with React Native and Expo that helps users explore travel destinations around the world. The app allows users to browse destinations, view detailed information, save favourites, and manage their profile with a beautiful dark mode interface.

**Course:** IN3210 Mobile Applications Development  
**Assignment:** Assignment 2 - Cross-Platform Mobile Development  
**Index Number:** 224208A (Last Digit: 8)  
**Topic:** Travel & Transport - "GoMate" – View public transport schedules or explore destinations

## 🔗 APIs Used

This project uses the following public APIs as per assignment requirements:

### 1. **DummyJSON API** (Authentication)
- **URL:** https://dummyjson.com
- **Documentation:** https://dummyjson.com/docs/auth
- **Usage:** User authentication (login)
- **Test Credentials:**
  - Username: `emilys`
  - Password: `emilyspass`

### 2. **REST Countries API** (Destinations Data)
- **URL:** https://restcountries.com/v3.1
- **Documentation:** https://restcountries.com
- **Usage:** Fetch country information for travel destinations
- **Data Retrieved:** Country names, capitals, regions, population, languages
- **Note:** Combined with Unsplash images for enhanced visual experience

## ✨ Features

### Core Features
- ✅ **User Authentication**
  - Login with DummyJSON API integration
  - Registration with validation (username, email, password)
  - Secure token storage using AsyncStorage (best security practices)
  - Form validation using Yup and Formik
  - Fallback authentication for demo purposes

- ✅ **Navigation**
  - Stack Navigation for authentication flow
  - Bottom Tab Navigation for main app sections
  - Nested navigation for destination details
  - Smooth transitions between screens

- ✅ **Home Screen (Dynamic Item List)**
  - Dynamic list of travel destinations fetched from REST Countries API
  - Search functionality to filter destinations
  - Pull-to-refresh to reload data
  - Beautiful destination cards with:
    - High-quality images
    - Title (destination name)
    - Description
    - Status badges (Popular, Trending, Featured)
  - User greeting with username display in header

- ✅ **Item Interaction & State Management**
  - Tap item to open Details Screen
  - State managed using Redux Toolkit
  - Global state for authentication, destinations, favourites, and theme
  - Proper action creators and reducers

- ✅ **Destination Details**
  - Full-screen destination information
  - Image gallery
  - Detailed descriptions and highlights
  - Travel information (country, region, rating)
  - Add/remove from favourites

- ✅ **Favourites Management**
  - Mark items as favourites
  - Persistent storage with AsyncStorage
  - View all saved favourites in separate screen
  - Remove from favourites
  - Navigate to destination details

- ✅ **Profile & Settings**
  - User profile display
  - Statistics (favourites count)
  - Account management options
  - Clear favourites option
  - Logout functionality

- ✅ **State Management**
  - Redux Toolkit for global state
  - Separate slices for auth, destinations, favourites, and theme
  - Type-safe Redux hooks

### Bonus Features
- ⭐ **Dark Mode Toggle**
  - System-wide dark mode
  - Persistent theme preference
  - Smooth theme transitions
  - All screens support both themes

### UI/UX
- 🎨 Consistent design system with custom theme
- 🎯 Feather Icons used throughout the app
- 📱 Responsive design for various screen sizes
- 🌈 Beautiful color schemes for light and dark modes
- ✨ Smooth animations and transitions
- 📦 Material Design-inspired components

## 🛠️ Technology Stack

- **Framework:** React Native with Expo SDK
- **Language:** TypeScript
- **Navigation:** React Navigation (Stack & Bottom Tabs)
- **State Management:** Redux Toolkit
- **Data Persistence:** AsyncStorage
- **Form Handling:** Formik
- **Validation:** Yup
- **HTTP Client:** Axios
- **Icons:** Feather Icons (@expo/vector-icons)
- **UI Components:** Custom reusable components

## 📡 API Integration Details

### 1. DummyJSON API (Authentication)
- **Base URL:** `https://dummyjson.com`
- **Documentation:** https://dummyjson.com/docs/auth

#### Endpoints Used:
- **POST** `/auth/login` - User authentication
  ```json
  {
    "username": "emilys",
    "password": "emilyspass",
    "expiresInMins": 30
  }
  ```
  
#### Response:
```json
{
  "id": 1,
  "username": "emilys",
  "email": "emily.johnson@x.dummyjson.com",
  "accessToken": "eyJhbGc...",
  ...
}
```

#### Implementation:
- Located in: `src/services/authService.ts`
- Handles login authentication with real API calls
- Implements fallback mock authentication for demo purposes
- Stores JWT token securely in AsyncStorage

### 2. REST Countries API (Destinations Data)
- **Base URL:** `https://restcountries.com/v3.1`
- **Documentation:** https://restcountries.com

#### Endpoints Used:
- **GET** `/all?fields=name,capital,region,population,languages,currencies,timezones`

#### Response Sample:
```json
[
  {
    "name": {
      "common": "France",
      "official": "French Republic"
    },
    "capital": ["Paris"],
    "region": "Europe",
    "population": 67391582,
    "languages": { "fra": "French" }
  }
]
```

#### Implementation:
- Located in: `src/services/destinationService.ts`
- Fetches real country data from REST Countries API
- Filters for 20 popular travel destinations
- Combines with Unsplash images for enhanced visuals
- Implements search functionality
- Error handling with user-friendly messages

## 📁 Project Structure

```
GoMate/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── DestinationCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── index.ts
│   ├── navigation/          # Navigation configuration
│   │   ├── AuthNavigator.tsx
│   │   ├── HomeNavigator.tsx
│   │   ├── MainNavigator.tsx
│   │   └── index.tsx
│   ├── redux/               # Redux store and slices
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── destinationSlice.ts
│   │   │   ├── favouritesSlice.ts
│   │   │   └── themeSlice.ts
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── screens/             # Application screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DetailsScreen.tsx
│   │   ├── FavouritesScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── index.ts
│   ├── services/            # API and storage services
│   │   ├── authService.ts
│   │   ├── destinationService.ts
│   │   └── storageService.ts
│   ├── theme/               # Theme configuration
│   │   ├── colors.ts
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── utils/               # Utility functions
│       └── validationSchemas.ts
├── App.tsx                  # Application entry point
├── package.json
└── tsconfig.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd GoMate
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your device:**
   - Scan the QR code with Expo Go app (Android)
   - Or scan with Camera app (iOS)
   
   OR
   
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (macOS only)
   - Press `w` for web browser

## 🔑 Test Credentials

For testing the login functionality, use these credentials:

### DummyJSON API Credentials
**Username:** emilys  
**Email:** emilys@example.com  
**Password:** emilyspass

**Note:** The app uses DummyJSON API for authentication. If the API is unavailable, it falls back to a local mock authentication that accepts any valid email and password (minimum 6 characters).

Or register a new account through the registration screen (uses local authentication).

