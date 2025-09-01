# MediaQuest

## Description

MediaQuest is a full-stack web application that allows users to search for media content on the iTunes Store using the official iTunes Search API. Users can enter search terms and filter results by media type such as movies, podcasts, music, audiobooks, and more. The app features a responsive and user-friendly React frontend styled with Bootstrap, alongside a Node.js/Express backend that securely handles API requests with JWT authorization.

---

## Key Features

- **Search Input:** Enter search terms and select media types to filter iTunes content.

- **Results Display:** View album/track info including album name, artist, album cover, and release date.

- **Favourites List:** Add or remove items from a favourites list during your session (not persisted after refresh).

- **Responsive UI:** Built with React and Bootstrap for a clean, mobile-friendly interface.

- **Backend API:** Node.js/Express server proxies requests to the iTunes API and issues JWT tokens for secure communication.

- **JWT Authorization:** All search requests require a valid JWT token.

---

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16+ recommended)

- npm (bundled with Node.js)

### Clone the repository

```bash
git clone https://github.com/matthewjmon/itunes-media-search-app.git
cd itunes-media-search-app
```

## Backend Setup

**Navigate to the backend folder:**

```bash
cd backend
```

**Install backend dependencies:**

```bash
npm install
```

**Create a .env file in the backend folder with these contents:**
`JWT_SECRET=your_secret_key_here`
`PORT=5000`

**Start the backend server:**

```bash
npm start
```

The backend will run on http://localhost:5000.

## Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

**Install frontend dependencies:**

```bash
npm install
```

**Start the frontend development server with proxy:**

```bash
npm run dev
```

The frontend will run on http://localhost:3000 (or another Vite-assigned port).

## Production Build

### To serve the frontend via backend:

1. **From the frontend folder, run:**

```bash
npm run build
```

- This creates a dist folder with static assets.
- The backend is configured to serve static files from ../frontend/dist.

2. **Start the backend server (run npm start in the backend folder)**
3. **Access the app at http://localhost:5000.**

## Project Structure

```
itunes-media-search-app/
├── backend/
│   ├── routes/
│   │   ├── itunes.js      # iTunes API proxy with JWT authorization
│   │   └── token.js       # JWT token issuance route
│   ├── server.js          # Express server entry point
│   ├── package.json       # Backend dependencies and scripts
│   └── .env               # Environment variables (JWT_SECRET, PORT)
└── frontend/
    ├── src/
    │   ├── components/    # React UI components (SearchBar, ResultsList, Navbar, etc.)
    │   ├── App.jsx        # Main React app component
    │   └── main.jsx       # React entry point
    ├── public/            # Public assets (favicon, index.html)
    ├── vite.config.js     # Vite config with backend proxy
    └── package.json       # Frontend dependencies and scripts
```

## Notes

- The favourites list is stored in React state and resets after page reload.
- JWT tokens expire after 1 hour to secure API requests.
- No user authentication or persistent database as per project requirements.

## Optional

- Deploy the app by serving the production frontend build via the backend on any server or cloud platform.
- For local testing, run backend (localhost:5000) and frontend dev server (localhost:3000) concurrently.

## License

This project is provided as-is without any warranty.

## About me

**Name:** Matthew Monaghan
**Email:** monaghanmatt18@gmail.com
**GitHub:** https://github.com/matthewjmon
