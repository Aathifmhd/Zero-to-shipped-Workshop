# Zero to Shipped — Resume Parser

Upload a resume PDF and a job description, get a match score plus the skills you have and the ones you're missing.

```
frontend/   React + Vite landing page
backend/    Express API + MongoDB
  server.js
  config/       env config + MongoDB connection
  routes/       /api/resume routes
  controllers/  request handling + validation
  services/     PDF text extraction, analysis, history (DB)
  middleware/   PDF upload (multer), error handling
  models/       Mongoose schema for saved analyses
  utils.js      HttpError, asyncHandler, skill dictionary + extractor
```

## Run it

```bash
cd backend && npm install && cp .env.example .env && npm run dev   # http://localhost:5000
cd frontend && npm install && npm run dev                          # http://localhost:5173
```

The Vite dev server proxies `/api` to the backend. MongoDB is optional: without it the API still
scores resumes, it just doesn't save them. `frontend/public/sample-resume.pdf` is a test resume.

## API

- `POST /api/resume/analyze` — multipart: `resume` (PDF, max 4 MB), `jobDescription` (text) →
  `{ id, fileName, score, matchedSkills, missingSkills, extraSkills }`
- `GET /api/resume/history` — last 20 saved analyses
- `GET /api/health`

## Deploy to Vercel (two projects, same repo)

1. **Backend** — new project, Root Directory `backend`. Env vars:
   - `MONGODB_URI` — MongoDB Atlas connection string (allow access from `0.0.0.0/0` in Atlas)
   - `CLIENT_URL` — the frontend's URL, e.g. `https://your-frontend.vercel.app` (comma-separate several)
2. **Frontend** — new project, Root Directory `frontend`. Env var:
   - `VITE_API_URL` — the backend's URL, e.g. `https://your-backend.vercel.app`

Deploy the backend first so you have its URL, then the frontend, then set the backend's
`CLIENT_URL` to the frontend URL and redeploy the backend.

## AI (next step)

Scoring is currently a keyword matcher in `backend/services/analysisService.js`. Replace `analyze()`
with the AI version and keep the same return shape — nothing else needs to change.
