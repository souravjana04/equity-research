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

app = FastAPI(title="MarketMint API", lifespan=lifespan)

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

from backend.api.routes import (
    stocks, portfolio, screener, earnings, news,
    sector, macro, swing, thesis, chat, reports,
)

app.include_router(stocks.router,    prefix="/api/stocks",    tags=["stocks"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["portfolio"])
app.include_router(screener.router,  prefix="/api/screener",  tags=["screener"])
app.include_router(earnings.router,  prefix="/api/earnings",  tags=["earnings"])
app.include_router(news.router,      prefix="/api/news",      tags=["news"])
app.include_router(sector.router,    prefix="/api/sector",    tags=["sector"])
app.include_router(macro.router,     prefix="/api/macro",     tags=["macro"])
app.include_router(swing.router,     prefix="/api/swing",     tags=["swing"])
app.include_router(thesis.router,    prefix="/api/thesis",    tags=["thesis"])
app.include_router(chat.router,      prefix="/api/chat",      tags=["chat"])
app.include_router(reports.router,   prefix="/api/reports",   tags=["reports"])
