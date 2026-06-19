# Equity Research Platform

A personal equity research and portfolio management web app. It combines a Vite+React frontend with a high-density, analytical design and a FastAPI+SQLite backend for data aggregation, tracking, and AI-assisted summaries.

## Folder Structure

```
equity-research/
├── frontend/                        # React app (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/                   # Application pages
│   │   ├── styles/                  # Tailwind tokens & CSS
│   │   └── App.jsx
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                         # Python backend (FastAPI)
│   ├── api/                         # FastAPI routes and entry
│   ├── data/                        # Fetchers, db connections, scheduler
│   ├── migrations/                  # SQLite migration scripts
│   └── requirements.txt
```

## Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

## Running the Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload
```

## Environment Setup
Copy `.env.example` to `.env` in the root (or `backend` folder) and fill in your API keys for services like Tapetide, Finnhub, and Telegram.

## Tech Stack

| Domain | Tech |
|---|---|
| Frontend | React, Vite, Tailwind CSS, Recharts, Lucide, React Query |
| Backend | FastAPI, Uvicorn, Python |
| Database | SQLite (WAL mode) |
