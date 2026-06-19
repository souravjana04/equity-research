from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
from backend.data.db import run_migrations

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run migrations on startup
    logger.info("Running database migrations...")
    try:
        run_migrations()
        logger.info("Database migrations completed successfully.")
    except Exception as e:
        logger.error(f"Failed to run migrations: {e}")
        raise e
    yield
    # Cleanup on shutdown

app = FastAPI(title="Equity Research API", lifespan=lifespan)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# We will import and include routers here later
# from api.routes import stocks
# app.include_router(stocks.router, prefix="/api/stocks", tags=["stocks"])
