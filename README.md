# GoMate - Travel & Transport Mobile App

## 📱 About
GoMate is a cross-platform mobile application built with React Native and Expo that helps users explore travel destinations around the world. The app allows users to browse destinations, view detailed information, save favourites, and manage their profile with a beautiful dark mode interface.

**Course:** IN3210 Mobile Applications Development  
**Assignment:** Assignment 2 - Cross-Platform Mobile Development  
**Index Number:** 224208A  
**Topic:** Travel & Transport - View public transport schedules or explore destinations

## ✨ Features

### Core Features
- ✅ **User Authentication**
  - Login with email and password
  - Registration with validation (username, email, password)
  - Secure token storage using AsyncStorage
  - Form validation using Yup and Formik

- ✅ **Navigation**
  - Stack Navigation for authentication flow
  - Bottom Tab Navigation for main app sections
  - Nested navigation for destination details
  - Smooth transitions between screens

- ✅ **Home Screen**
  - Dynamic list of travel destinations from REST Countries API
  - Search functionality to filter destinations
  - Pull-to-refresh to reload data
  - Beautiful destination cards with images and ratings
  - User greeting with username display

- ✅ **Destination Details**
  - Full-screen destination information
  - Image gallery
  - Detailed descriptions and highlights
  - Travel information (country, region, rating)
  - Add/remove from favourites

- ✅ **Favourites Management**
  - Save favourite destinations
  - Persistent storage with AsyncStorage
  - View all saved favourites
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

## 📡 APIs Used

1. **Authentication:** DummyJSON API
   - URL: https://dummyjson.com
   - Endpoints: `/auth/login`, `/users/add`

2. **Destinations:** REST Countries API
   - URL: https://restcountries.com/v3.1
   - Endpoint: `/all?fields=name,capital,region,flags,population,languages`

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

**Email:** emilys@example.com  
**Password:** emilyspass

Or register a new account through the registration screen.

## 📸 Screenshots

### Authentication
- Login Screen (Light & Dark Mode)
- Registration Screen

### Main Application
- Home Screen with destination list
- Search functionality
- Destination Details Screen
- Favourites Screen
- Profile Screen
- Dark Mode Toggle

*Screenshots should be placed in a `/screenshots` folder*

## 🎥 Demo Video

A 2-minute demo video showcasing:
1. User authentication (login/register)
2. Browse destinations on home screen
3. Search functionality
4. View destination details
5. Add/remove favourites
6. Navigate between tabs
7. Dark mode toggle
8. Profile management
9. Logout

*Video link: [To be added]*

## 🏆 Assignment Requirements Coverage

### ✅ User Authentication (15 marks)
- Registration and login flow implemented
- Form validation using Yup
- React Hooks for form handling (Formik)
- Secure token storage with AsyncStorage
- Username displayed in app header

### ✅ Navigation Structure (10 marks)
- React Navigation implemented
- Stack navigation for auth flow
- Bottom tab navigation for main app
- Nested navigation for details

### ✅ Home Screen - Dynamic Item List (15 marks)
- Destinations fetched from REST Countries API
- Card-based display with image, title, description
- Status badges (Popular, Trending, Featured)
- Search and filter functionality

### ✅ Item Interaction & State Management (15 marks)
- Tap to view details screen
- Redux Toolkit for state management
- Organized slices for different features

### ✅ Favourites (15 marks)
- Add/remove favourites functionality
- Separate favourites screen
- AsyncStorage persistence
- Empty state handling

### ✅ Styling and UI (15 marks)
- Consistent design system
- Feather Icons throughout
- Responsive design
- Light and dark themes

### ✅ Code Quality & Best Practices (20 marks)
- TypeScript for type safety
- Modular, reusable components
- Feature-based folder structure
- Clean, readable code
- Proper error handling
- Loading states

### ✅ Demo Video (5 marks)
- Complete app flow demonstration
- Under 2 minutes

### ⭐ Bonus Features (5 marks)
- Dark mode toggle with persistence

## 🔧 Development Best Practices

1. **TypeScript:** Full type safety across the application
2. **Component Reusability:** Shared components in `/components`
3. **State Management:** Redux Toolkit with proper slice organization
4. **Service Layer:** Separated API calls and storage operations
5. **Validation:** Yup schemas for form validation
6. **Error Handling:** Try-catch blocks and user-friendly error messages
7. **Code Organization:** Feature-based folder structure
8. **Responsive Design:** Dimensions API for responsive layouts

## 🐛 Known Issues & Future Enhancements

### Current Limitations
- Mock API for authentication (DummyJSON)
- Limited destination data (20 destinations)

### Future Enhancements
- Real backend integration
- Advanced search filters
- Booking functionality
- Public transport schedules
- Maps integration
- Push notifications
- Social sharing
- Reviews and ratings

## 📝 Git Commits

The project follows feature-based commits:
- `feat: initial project setup`
- `feat: add authentication screens`
- `feat: implement navigation structure`
- `feat: add Redux state management`
- `feat: create home screen with destinations`
- `feat: implement details screen`
- `feat: add favourites functionality`
- `feat: create profile screen`
- `feat: implement dark mode`
- `feat: add validation and error handling`
- `docs: update README`

## 👨‍💻 Author

**Name:** [Your Name]  
**Index Number:** 224208A  
**Course:** IN3210 Mobile Applications Development  
**University:** University of Moratuwa

## 📄 License

This project is created for educational purposes as part of Assignment 2.

## 🙏 Acknowledgments

- React Native and Expo teams
- REST Countries API
- DummyJSON API
- Feather Icons
- React Navigation team
- Redux Toolkit team

---

**Submission Date:** 23rd November, 2025
