# bookStoreProject
project with client and server interaction using REST API

              ┌───────────────┐
              │   GitHub Push │
              └───────┬───────┘
                      │
                      ▼
          ┌─────────────────────────┐
          │   Backend (Django) CI   │
          └─────────────────────────┘
                 │    │
                 │    └─> Install Python
                 │    └─> Install deps (pip)
                 │    └─> Run migrations
                 │    └─> Run tests
                 ▼
          ┌─────────────────────────┐
          │  Frontend (React) CI    │
          └─────────────────────────┘
                 │
                 └─> Install Node.js
                 └─> npm install
                 └─> npm run build
                      ▼
           ┌─────────────────────────┐
           │  Deployment (Optional)  │
           └─────────────────────────┘
                 │
     ┌───────────┴───────────┐
     ▼                       ▼
 Backend Deploy          Frontend Deploy
 (Render/Heroku)         (Vercel/Netlify)
