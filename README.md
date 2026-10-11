# Zero to Shipped — Resume Parser

Upload a resume PDF and a job description, and Claude scores the match, lists the skills you have and the ones you're missing, and suggests improvements.

```
frontend/   React + Vite landing page
backend/    Express API + MongoDB
  server.js
  config/       env config + MongoDB connection
  routes/       /api/resume routes
  controllers/  request handling + validation
  services/     Claude analysis (aiService), keyword fallback, PDF text, history (DB)
  middleware/   PDF upload (multer), error handling
  models/       Mongoose schema for saved analyses
  utils.js      HttpError, asyncHandler, skill dictionary + extractor
```

## Run it

```bash
cd backend && npm install && cp .env.example .env && npm run dev   # http://localhost:5000 (add ANTHROPIC_API_KEY to .env)
cd frontend && npm install && npm run dev                          # http://localhost:5173
```

The Vite dev server proxies `/api` to the backend. MongoDB is optional: without it the API still
scores resumes, it just doesn't save them. `frontend/public/sample-resume.pdf` is a test resume.

## API

- `POST /api/resume/analyze` — multipart: `resume` (PDF, max 4 MB), `jobDescription` (text) →
  `{ id, fileName, method, score, summary, matchedSkills, missingSkills, strengths, improvements }`
- `GET /api/resume/history` — last 20 saved analyses
- `GET /api/health`

## Deploy to Vercel (two projects, same repo)

1. **Backend** — new project, Root Directory `backend`. Env vars:
   - `ANTHROPIC_API_KEY` — your Claude API key
   - `MONGODB_URI` — MongoDB Atlas connection string (allow access from `0.0.0.0/0` in Atlas)
   - `CLIENT_URL` — the frontend's URL, e.g. `https://your-frontend.vercel.app` (comma-separate several)
2. **Frontend** — new project, Root Directory `frontend`. Env var:
   - `VITE_API_URL` — the backend's URL, e.g. `https://your-backend.vercel.app`

Deploy the backend first so you have its URL, then the frontend, then set the backend's
`CLIENT_URL` to the frontend URL and redeploy the backend.

## How the AI works

`backend/services/aiService.js` sends the resume PDF (as a native PDF document, so layout is
preserved) and the job description to Claude (`claude-opus-5-5` by default, override with
`CLAUDE_MODEL`) and gets back JSON validated against a Zod schema. If `ANTHROPIC_API_KEY` isn't
set, the API falls back to the keyword matcher in `analysisService.js`.
