**Restaurant Website — Natures Spices**

- **Project type:** Full-stack restaurant web app (React + Express)

**Tech Stack**
- **Frontend:** React (v18), React Router, Redux Toolkit, Axios, Bootstrap
- **Backend:** Node.js, Express, Mongoose (MongoDB), JSON Web Tokens (JWT)
- **Dev tools:** nodemon, axios, react-scripts

**Quick Pitch**: A modern, responsive restaurant storefront built with React and Redux Toolkit on the client and Express + Mongoose on the server. It demonstrates JWT-based authentication, cart and order management, RESTful API design, and an organized project structure.

**Live Demo / Screenshots**
- Run locally (see steps below) to preview the UI in your browser.
- App assets and sample images: `server/public/fooditem` and `client/src/assets`.

**Key Features**
- JWT-based authentication and protected routes
- Product listing and category pages
- Add-to-cart and cart persistence (Redux store)
- Place orders and order management endpoints
- Search and filtering (client-side + store integration)
- Structured project with separate `client/` and `server/` folders

**Repository Layout (high level)**
- `client/` - React single-page app
  - `src/components/` - UI components (Navbar, Footer, FoodCard, etc.)
  - `src/pages/` - Page routes (Home, Menu, Cart, Auth)
  - `src/store/` - Redux store, slices, and API helpers
- `server/` - Express API and data models
  - `controllers/` - Request handlers (auth, products, cart, orders)
  - `models/` - Mongoose models (`User`, `Product`, `Cart`, `Order`)
  - `routes/` - API routing
  - `config/` - DB and environment configs
  - `DB_Data_and_Structure/restaurant_2` - sample JSON data used for development

**Install & Run (Windows PowerShell)**
1. Clone the repo and open a terminal in the project root.

2. Start the server (API):
```
cd server
npm install
# Create a `.env` file in `server/config/` or use `config/config.env` values.
# Required env vars typically include: MONGODB_URI, JWT_SECRET, PORT
npm run start
```

3. Start the client (React app):
```
cd client
npm install
npm start
```

4. Open the app in your browser at `http://localhost:3000` (client) and API at configured server port (default uses `server/server.js`).

**Build for Production (client)**
```
cd client
npm run build
```

**Contributing**
- Fork the repo, create a feature branch, open a pull request. Keep changes scoped and include tests where possible.

**Contact / Author**
- GitHub: `lokeshbhangale89` (repository owner)
- For more information or a walkthrough, open an issue or contact via the Linkedin profile.
