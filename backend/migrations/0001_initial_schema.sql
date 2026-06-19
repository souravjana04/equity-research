CREATE TABLE IF NOT EXISTS schema_migrations (
    version     INTEGER PRIMARY KEY,
    filename    TEXT NOT NULL,
    applied_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =============================================================================
-- Equity Research & Portfolio System — SQLite Schema
-- Sprint 1, Story 1.6
-- =============================================================================

-- =============================================================================
-- 1. STOCKS (master registry)
--    Covers Indian equities, US stocks, global ETFs.
--    asset_type: STOCK | ETF | MF | DERIVATIVE
--    exchange: NSE | BSE | NYSE | NASDAQ | etc.
-- =============================================================================
CREATE TABLE IF NOT EXISTS stocks (
    ticker       TEXT PRIMARY KEY,          -- e.g. RELIANCE.NS, AAPL, VTI
    name         TEXT NOT NULL,
    exchange     TEXT NOT NULL,             -- NSE | BSE | NYSE | NASDAQ | LSE …
    asset_type   TEXT NOT NULL DEFAULT 'STOCK', -- STOCK | ETF | MF | DERIVATIVE
    sector       TEXT,
    industry     TEXT,
    currency     TEXT NOT NULL DEFAULT 'INR',
    country      TEXT NOT NULL DEFAULT 'IN',
    is_active    INTEGER NOT NULL DEFAULT 1,
    created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_stocks_sector ON stocks(sector);
CREATE INDEX IF NOT EXISTS idx_stocks_asset_type ON stocks(asset_type);


-- =============================================================================
-- 2. PRICE HISTORY (OHLCV cache — filled by yfinance / Tapetide / Finnhub)
--    One row per ticker per date.
--    source: yfinance | tapetide | finnhub
-- =============================================================================
CREATE TABLE IF NOT EXISTS price_history (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker      TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    date        TEXT NOT NULL,              -- ISO date YYYY-MM-DD
    open        REAL,
    high        REAL,
    low         REAL,
    close       REAL NOT NULL,
    volume      INTEGER,
    adjusted    INTEGER NOT NULL DEFAULT 1, -- 1 = adjusted close
    source      TEXT NOT NULL DEFAULT 'yfinance',
    fetched_at  TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (ticker, date)
);

CREATE INDEX IF NOT EXISTS idx_price_ticker_date ON price_history(ticker, date DESC);


-- =============================================================================
-- 3. FUNDAMENTALS CACHE
--    period_type: TTM | ANNUAL | QUARTERLY
--    period_label: e.g. "Q4FY25", "FY25", "TTM"
--    source: tapetide | finnhub | manual
-- =============================================================================
CREATE TABLE IF NOT EXISTS fundamentals_cache (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker          TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    period_type     TEXT NOT NULL,          -- TTM | ANNUAL | QUARTERLY
    period_label    TEXT NOT NULL,          -- Q4FY25 | FY25 | TTM
    -- Income statement
    revenue         REAL,                   -- in crores (INR) or USD millions
    net_profit      REAL,
    ebitda          REAL,
    eps             REAL,
    -- Margins
    gross_margin    REAL,
    ebitda_margin   REAL,
    net_margin      REAL,
    -- Returns
    roce            REAL,
    roe             REAL,
    roa             REAL,
    -- Valuation
    pe_ratio        REAL,
    pb_ratio        REAL,
    ps_ratio        REAL,
    ev_ebitda       REAL,
    mcap            REAL,
    -- Balance sheet
    debt_equity     REAL,
    current_ratio   REAL,
    -- Growth (YoY %)
    revenue_growth  REAL,
    profit_growth   REAL,
    -- Source
    source          TEXT NOT NULL DEFAULT 'tapetide',
    fetched_at      TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (ticker, period_type, period_label)
);

CREATE INDEX IF NOT EXISTS idx_fund_ticker ON fundamentals_cache(ticker, period_type);


-- =============================================================================
-- 4. SHAREHOLDING HISTORY
--    Quarterly promoter / FII / DII / public breakdown.
-- =============================================================================
CREATE TABLE IF NOT EXISTS shareholding_history (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker          TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    quarter         TEXT NOT NULL,          -- Q4FY25
    promoter_pct    REAL,
    fii_pct         REAL,
    dii_pct         REAL,
    public_pct      REAL,
    pledged_pct     REAL,                   -- % of promoter holding pledged
    fetched_at      TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (ticker, quarter)
);

CREATE INDEX IF NOT EXISTS idx_share_ticker ON shareholding_history(ticker, quarter DESC);


-- =============================================================================
-- 5. WATCHLIST
--    Price alerts supported above/below a threshold.
-- =============================================================================
CREATE TABLE IF NOT EXISTS watchlist (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker              TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    alert_price_above   REAL,               -- fire Telegram alert if LTP > this
    alert_price_below   REAL,               -- fire Telegram alert if LTP < this
    alert_active        INTEGER NOT NULL DEFAULT 1,
    notes               TEXT,
    added_at            TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (ticker)
);


-- =============================================================================
-- 6. NEWS
--    Pulled from Tapetide / Finnhub.
--    sentiment: POSITIVE | NEGATIVE | NEUTRAL
-- =============================================================================
CREATE TABLE IF NOT EXISTS news (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker          TEXT REFERENCES stocks(ticker) ON DELETE SET NULL,
    headline        TEXT NOT NULL,
    summary         TEXT,
    url             TEXT,
    source          TEXT,                   -- e.g. "Economic Times", "Reuters"
    sentiment       TEXT,                   -- POSITIVE | NEGATIVE | NEUTRAL
    sentiment_score REAL,                   -- -1.0 to 1.0
    category        TEXT,                   -- EARNINGS | MACRO | SECTOR | COMPANY
    published_at    TEXT,
    fetched_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_news_ticker ON news(ticker, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_sentiment ON news(ticker, sentiment);


-- =============================================================================
-- 7. EARNINGS CALENDAR + RESULTS
--    beat_miss: BEAT | MISS | IN_LINE | PENDING
-- =============================================================================
CREATE TABLE IF NOT EXISTS earnings (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker              TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    quarter             TEXT NOT NULL,      -- Q4FY25
    report_date         TEXT,               -- scheduled date
    eps_estimate        REAL,
    eps_actual          REAL,
    revenue_estimate    REAL,
    revenue_actual      REAL,
    beat_miss           TEXT DEFAULT 'PENDING', -- BEAT | MISS | IN_LINE | PENDING
    beat_pct            REAL,               -- % surprise on EPS
    concall_date        TEXT,
    concall_time        TEXT,               -- HH:MM IST
    reminder_sent       INTEGER NOT NULL DEFAULT 0,
    created_at          TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (ticker, quarter)
);

CREATE INDEX IF NOT EXISTS idx_earnings_ticker ON earnings(ticker, quarter DESC);
CREATE INDEX IF NOT EXISTS idx_earnings_date ON earnings(report_date);


-- =============================================================================
-- 8. CONCALL SUMMARIES (AI-generated via Gemini Pro)
--    key_points / risks_mentioned / guidance stored as JSON arrays.
-- =============================================================================
CREATE TABLE IF NOT EXISTS concall_summaries (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    earnings_id     INTEGER REFERENCES earnings(id) ON DELETE SET NULL,
    ticker          TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    quarter         TEXT NOT NULL,
    summary_text    TEXT NOT NULL,
    key_points      TEXT,                   -- JSON array of strings
    risks_mentioned TEXT,                   -- JSON array of strings
    guidance        TEXT,                   -- management guidance text
    sentiment       TEXT,                   -- POSITIVE | NEGATIVE | NEUTRAL
    model_used      TEXT DEFAULT 'gemini-pro',
    source_url      TEXT,                   -- transcript/audio link
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (ticker, quarter)
);

CREATE INDEX IF NOT EXISTS idx_concall_ticker ON concall_summaries(ticker, quarter DESC);


-- =============================================================================
-- 9. SCREENER PRESETS (saved screens)
--    screen_type: FUNDAMENTAL | TECHNICAL
--    filters_json: serialised filter config understood by screener module
-- =============================================================================
CREATE TABLE IF NOT EXISTS screener_presets (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL UNIQUE,
    description     TEXT,
    screen_type     TEXT NOT NULL DEFAULT 'FUNDAMENTAL', -- FUNDAMENTAL | TECHNICAL
    filters_json    TEXT NOT NULL,          -- JSON object of filter criteria
    sort_by         TEXT,
    sort_order      TEXT DEFAULT 'DESC',    -- ASC | DESC
    result_count    INTEGER,                -- number of results on last run
    last_run_at     TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);


-- =============================================================================
-- 10. SECTOR DATA CACHE
--     FII/DII flows, sector RSI, momentum score — refreshed daily.
-- =============================================================================
CREATE TABLE IF NOT EXISTS sector_data_cache (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    sector          TEXT NOT NULL,
    date            TEXT NOT NULL,          -- YYYY-MM-DD
    fii_buy_cr      REAL,                   -- crores
    fii_sell_cr     REAL,
    fii_net_cr      REAL,
    dii_buy_cr      REAL,
    dii_sell_cr     REAL,
    dii_net_cr      REAL,
    sector_rsi      REAL,
    momentum_score  REAL,
    avg_pe          REAL,
    avg_pb          REAL,
    top_gainers     TEXT,                   -- JSON array of tickers
    top_losers      TEXT,                   -- JSON array of tickers
    fetched_at      TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (sector, date)
);

CREATE INDEX IF NOT EXISTS idx_sector_date ON sector_data_cache(sector, date DESC);


-- =============================================================================
-- 11. SWING TRADES
--     status: ACTIVE | CLOSED | CANCELLED
--     Covers both active candidates and closed trade log.
-- =============================================================================
CREATE TABLE IF NOT EXISTS swing_trades (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker          TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    status          TEXT NOT NULL DEFAULT 'ACTIVE', -- ACTIVE | CLOSED | CANCELLED
    -- Entry
    entry_price     REAL NOT NULL,
    target_price    REAL NOT NULL,
    stop_loss       REAL NOT NULL,
    qty             INTEGER NOT NULL DEFAULT 1,
    entry_date      TEXT NOT NULL,
    entry_reason    TEXT,                   -- why entered (signal / thesis)
    -- R:R
    risk_reward     REAL,                   -- computed: (target-entry)/(entry-sl)
    risk_pct        REAL,                   -- % risk per trade
    -- Exit
    exit_price      REAL,
    exit_date       TEXT,
    exit_reason     TEXT,                   -- SL hit | target hit | manual | trail
    pnl             REAL,                   -- realised P&L
    pnl_pct         REAL,
    -- Metadata
    setup_type      TEXT,                   -- breakout | pullback | reversal …
    timeframe       TEXT,                   -- daily | weekly
    notes           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_swing_status ON swing_trades(status, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_swing_ticker ON swing_trades(ticker);


-- =============================================================================
-- 12. THESIS JOURNAL
--     Notion is the primary store. This table is the local index —
--     so we can link thesis to stock, track status, and surface in UI.
--     status: ACTIVE | EXITED | PAUSED | INVALIDATED
-- =============================================================================
CREATE TABLE IF NOT EXISTS thesis_journal (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker          TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    notion_page_id  TEXT UNIQUE,            -- Notion page ID
    notion_url      TEXT,
    status          TEXT NOT NULL DEFAULT 'ACTIVE', -- ACTIVE | EXITED | PAUSED | INVALIDATED
    -- Snapshot at entry (duplicated from Notion for quick display)
    entry_price     REAL,
    target_price    REAL,
    stop_loss       REAL,
    position_size   REAL,                   -- % of portfolio
    horizon         TEXT,                   -- SHORT | MEDIUM | LONG
    core_thesis     TEXT,                   -- one-line thesis summary
    -- Outcome (filled on exit)
    exit_price      REAL,
    exit_date       TEXT,
    return_pct      REAL,
    thesis_correct  INTEGER,               -- 1 | 0 | NULL
    lessons         TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_thesis_status ON thesis_journal(status);
CREATE INDEX IF NOT EXISTS idx_thesis_ticker ON thesis_journal(ticker);


-- =============================================================================
-- 13. QUICK NOTES (lightweight per-stock annotations)
--     Different from thesis journal — informal, timestamped observations.
-- =============================================================================
CREATE TABLE IF NOT EXISTS quick_notes (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker      TEXT NOT NULL REFERENCES stocks(ticker) ON DELETE CASCADE,
    note        TEXT NOT NULL,
    tags        TEXT,                       -- JSON array e.g. ["earnings", "risk"]
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notes_ticker ON quick_notes(ticker, created_at DESC);


-- =============================================================================
-- 14. AI CHAT HISTORY
--     session_id groups a conversation thread.
--     role: user | assistant
--     tools_used: JSON array of MCP tool names called in this turn
-- =============================================================================
CREATE TABLE IF NOT EXISTS chat_history (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id  TEXT NOT NULL,
    ticker      TEXT,                       -- NULL if general market chat
    role        TEXT NOT NULL,              -- user | assistant
    content     TEXT NOT NULL,
    tools_used  TEXT,                       -- JSON array
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_history(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_ticker ON chat_history(ticker, created_at DESC);


-- =============================================================================
-- 15. WEEKLY REPORTS
--     Stores generated markdown and email delivery status.
--     email_status: PENDING | SENT | FAILED
-- =============================================================================
CREATE TABLE IF NOT EXISTS weekly_reports (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    week_ending     TEXT NOT NULL UNIQUE,   -- YYYY-MM-DD (Sunday)
    report_markdown TEXT NOT NULL,
    email_status    TEXT NOT NULL DEFAULT 'PENDING', -- PENDING | SENT | FAILED
    email_error     TEXT,
    generated_at    TEXT NOT NULL DEFAULT (datetime('now')),
    sent_at         TEXT
);


-- =============================================================================
-- 16. MACRO CACHE
--     Stores latest values for macro widgets on the dashboard.
--     metric_key examples: USD_INR | CRUDE_WTI | US_10Y_YIELD |
--                          NIFTY50 | SP500 | INDIA_VIX | GOLD_USD
-- =============================================================================
CREATE TABLE IF NOT EXISTS macro_cache (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    metric_key  TEXT NOT NULL UNIQUE,
    value       REAL NOT NULL,
    prev_close  REAL,                       -- for % change calculation
    change_pct  REAL,
    unit        TEXT,                       -- e.g. "INR", "USD/bbl", "%"
    fetched_at  TEXT NOT NULL DEFAULT (datetime('now'))
);


-- =============================================================================
-- 17. TELEGRAM NOTIFICATION LOG
--     Tracks all sent (or failed) alerts for deduplication and audit.
--     alert_type: PRICE_ALERT | RISK_ALERT | EARNINGS_REMINDER |
--                 CONCALL_READY | DAILY_BRIEFING | SENTIMENT_SPIKE |
--                 TARGET_HIT | SL_HIT
-- =============================================================================
CREATE TABLE IF NOT EXISTS telegram_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_type  TEXT NOT NULL,
    ticker      TEXT REFERENCES stocks(ticker) ON DELETE SET NULL,
    message     TEXT NOT NULL,
    sent        INTEGER NOT NULL DEFAULT 0, -- 1 = delivered
    error       TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_telegram_ticker ON telegram_log(ticker, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telegram_type ON telegram_log(alert_type, created_at DESC);


-- =============================================================================
-- SEED: macro keys (so dashboard doesn't need to check for existence)
-- =============================================================================
INSERT OR IGNORE INTO macro_cache (metric_key, value, unit) VALUES
    ('USD_INR',       0, 'INR'),
    ('CRUDE_WTI',     0, 'USD/bbl'),
    ('CRUDE_BRENT',   0, 'USD/bbl'),
    ('US_10Y_YIELD',  0, '%'),
    ('NIFTY50',       0, 'INR'),
    ('SP500',         0, 'USD'),
    ('INDIA_VIX',     0, 'index'),
    ('GOLD_USD',      0, 'USD/oz');
