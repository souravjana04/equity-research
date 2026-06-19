from fastapi import APIRouter, Query
from typing import List, Dict, Any
from backend.data.db import get_db

router = APIRouter()

@router.get("/search", response_model=List[Dict[str, Any]])
def search_stocks(q: str = Query(..., description="Search query for ticker or name")):
    if len(q) < 2:
        return []
    
    conn = get_db()
    try:
        cursor = conn.cursor()
        query = f"%{q}%"
        cursor.execute(
            "SELECT ticker, name, exchange, sector, industry FROM stocks WHERE ticker LIKE ? OR name LIKE ? LIMIT 20",
            (query, query)
        )
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()

# Stub for a get endpoint
@router.get("/{ticker}")
def get_stock(ticker: str):
    return {"ticker": ticker, "status": "stub"}
