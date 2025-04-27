# 🐴 Horse Project

A modern horse management web app built with:
- Vite
- React 18
- TypeScript
- TailwindCSS v4
- JWT Authentication
- React Router v6
- Axios
- Dark/Light Mode (ThemeContext)

---

## 🚀 Getting Started

### 1. Clone the Repository
git clone https://github.com/HaniAbderrazak/horse_project.git
cd horse_project

### 2. Install Dependencies
npm install
# or
pnpm install

### 3. Start Development Server
npm run dev

Access app at: http://localhost:5173

---

## 📁 Project Structure

src/
│
├── api/
│   └── horses.ts          # Horse TypeScript Interface
│
├── assets/
│   └── images/             # Static images (default avatar, etc.)
│
├── components/             # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LoaderComponent.tsx
│   ├── NotFoundComponent.tsx
│   ├── HorseComponent.tsx
│   ├── SwipperCarousel.tsx
│
├── context/
│   └── ThemeContext.tsx    # Theme (Dark/Light Mode) Context
│
├── hooks/
│   └── useHorses.ts        # Custom hook to fetch horses
│
├── pages/
│   ├── Login.tsx
│   ├── HorseList.tsx
│
├── routes/
│   └── ProtectedRoute.tsx  # Protects private routes
│
├── services/
│   ├── authService.ts      # Login API logic
│   └── horseService.ts     # Horse API fetching
│
├── styles/
│   └── main.css            # Global CSS and Tailwind setup
│
├── utils/
│   ├── auth.ts             # Token handling
│   └── horseFilters.ts     # Filtering horses by breed and search
│
├── App.tsx                 # App entry layout
├── main.tsx                # Vite/React app bootstrap
└── vite.config.ts          # Vite Configuration

---

## 📦 Main Components

- **Navbar**: Top navigation bar
- **Footer**: Bottom footer
- **HorseCard (HorseComponent)**: Card for displaying individual horse info
- **SwipperCarousel**: Hero image carousel
- **LoaderComponent**: Loading spinner and message
- **NotFoundComponent**: 404 and search error component

---

## 🧠 Contexts

- **ThemeContext**
  - Manage dark/light mode across the app
  - Provide `isDarkMode`, `toggleTheme()` to components

---

## 🧰 Custom Hooks

- **useHorses**
  - Fetches list of horses
  - Handles loading and error states

---

## 🔐 Authentication

- **authService.ts**
  - POST /login to get JWT token
  - Store token in localStorage

- **ProtectedRoute.tsx**
  - Guards routes that require authentication
  - Redirects to login if unauthenticated

---

## 🐎 Horses Logic

- **horseService.ts**
  - Fetch all horses from backend

- **horseFilters.ts**
  - `filterHorsesByBreed(horses, breed)`
  - `filterHorsesBySearch(horses, searchTerm)`

- **Horse.ts**
  - Full horse model, including user, gender, place, injuries, services, etc.

---

## 🎨 Styling

- Fully styled with **TailwindCSS v4**
- Dark mode supported
- Responsive and mobile friendly

---

## 🛣️ Routes

- `/login` → Login page
- `/horses` → Horse list page (with search + filter + pagination)
- `/horses/:id` →  Horse details page

---

## 🔥 Features

- User authentication with JWT
- Protected pages
- Dynamic horse filtering (search by name, breed, etc.)
- Filter horses by breed
- Responsive pagination
- Dark mode toggle
- Reusable and clean components
- Error handling (loading, empty states, not found pages)

---

## 👨‍💻 Developer

Made with ❤️ by [Hani Abderrazak](https://github.com/HaniAbderrazak)

---

