# MediaQuest
*Full-stack iTunes media search application built with React & Node.js*

![MediaQuest Screenshot](Images/itunes-app.png)

## Description

MediaQuest is a full-stack web application that allows users to search for media content on the iTunes Store using the official iTunes Search API. Users can enter search terms and filter results by media type such as movies, podcasts, music, audiobooks, and more. The app features a responsive and user-friendly React frontend styled with Bootstrap, alongside a Node.js/Express backend that securely handles API requests with JWT authorization.

---

**Tech Stack:** React, Node.js, Express, JWT, Bootstrap, Vite, iTunes API

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-CB4042?style=for-the-badge&logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## Key Features

**Front-End Features:**
- Responsive search UI built with React and Bootstrap
- Dynamic results display with album cover, artist, and release date
- Session-based favourites list

**Back-End Features:**
- Node.js/Express API proxies iTunes requests
- JWT-based authorization to secure API endpoints
- Designed RESTful routes for scalable API structure

---

### My Role
- Developed React frontend with responsive UI and Bootstrap
- Built Node.js/Express backend with JWT-secured API proxy
- Integrated iTunes Search API
- Implemented session-based favourites list
- Deployed full-stack application on Render

---

### Next Steps/Enhancements
- Persist favourites list in a database
- Add user authentication with login/signup
- Improve search performance with caching

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
