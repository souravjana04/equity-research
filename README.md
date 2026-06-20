## Project: Equity Research & Portfolio Management App

A personal full-stack web application for Indian equity research,
portfolio tracking, and AI-assisted stock analysis. Built and maintained
as a solo project.

Not a trading platform. Not a SaaS product.
A personal tool built by an engineer who invests — combining the
depth of a Bloomberg terminal with the focus of a personal notebook.

---

### Project Management

Kanban board (Notion): https://app.notion.com/p/7bd2abf8d9774008a55cd0653d53dddf?v=3849e1859d738198a06a000c20eadc9b&source=copy_link

When I ask about tasks, sprint status, what's next, or what's
in progress — automatically fetch this Notion board first using
the Notion MCP before responding. Always reflect the current
board state rather than relying on anything written in this
description. The Notion board is the single source of truth
for all tasks — not this file.

---

### Functional Requirements

Each page answers one specific question for the user:

| Page | Question it answers |
|------|---------------------|
| Dashboard `/` | What do I need to know and act on today? |
| Portfolio `/portfolio` | How is my portfolio performing overall? |
| Stock Detail `/stock/:ticker` | Everything about this one stock |
| Watchlist `/watchlist` | Which stocks am I tracking and why? |
| Earnings Tracker `/earnings` | What results and events are coming up? |
| News `/news` | What is happening across my holdings right now? |
| Screener `/screener` | Which stocks pass my fundamental filters? |
| Sector Analysis `/sector` | Where is institutional money flowing? |
| AI Stock Chat `/chat` | Let me ask with any AI about any stock |
| Swing Trade `/swing` | What short-term setups am I tracking? |
| Thesis Journal `/thesis` | Why do I own what I own? |

#### Dashboard (Morning Briefing)
- Live macro strip: Nifty 50, Sensex, USD/INR, Crude Oil, US 10Y, India VIX
- Portfolio pulse: day P&L, portfolio value, best and worst mover today
- Today's movers: all holdings ranked by day change %
- Watchlist snapshot: top tracked stocks with LTP and day change
- Upcoming earnings: next 7 days across holdings and watchlist
- Recent concall snippets: last 3 management call summaries
- News feed: last 24h headlines across holdings, sentiment-tagged

#### Portfolio (Performance Review)
- P&L summary: total invested, current value, total return, day change
- Sector allocation donut chart
- Benchmark comparison: portfolio vs Nifty 50 vs S&P 500
  (timeframes: 1M / 3M / 6M / 1Y / All)
- Full holdings table: ticker, avg buy price, LTP, quantity,
  invested, current value, P&L %, day change

#### Stock Detail
- Header: ticker badge, company name, LTP, day change, sector tag,
  exchange tag, RSI badge if RSI > 70 or < 30
- TradingView chart: candlestick with 50 DMA + 200 DMA overlays,
  volume bars, time range selector
- Key ratios strip: P/E, P/B, ROCE, ROE, Debt/Equity, Dividend Yield
- Tabbed deep-dive:
  - Overview: company description, quick facts, Notion thesis link,
    quick notes (local)
  - Financials: quarterly accordion — Revenue, EBITDA, PAT with
    YoY deltas
  - Shareholding: Promoter / FII / DII / Public donut + 12-month trend
  - News: sentiment-tagged feed filtered to this stock
  - Concalls: historical management call cards with AI summaries
    and key points

#### Watchlist
- Add / remove stocks with target price and thesis tags
- Sortable by day change, P/E, 52W position
- Alert badges when a stock hits target price or RSI extreme

#### Earnings Tracker
- Calendar view of upcoming results and corporate actions
- Filter by holdings / watchlist / all NSE
- Post-result surprise badge: Beat / Miss / In-line

#### News Tab
- Aggregated news across all tracked stocks
- AI sentiment classification: Positive / Neutral / Negative per article
- Filter by sentiment, stock, or source
- Last 30 days, refreshed on schedule

#### Screener
- Dual-tabbed interface for Fundamental and Technical screening
- Fundamental filters: P/E, P/B, ROCE, ROE, Debt/Equity,
  market cap, dividend yield, sector multi-select
- Technical filters: RSI, 50/200 DMA cross, volume spike, signal types
- Dynamic active filter grids with +Add Filter dropdown
- Save and name presets via slide-in panel
- Results link directly to Stock Detail page

#### Sector Analysis
- FII / DII net flow by sector (buy / sell / net in ₹ Cr)
- Sector heatmap: all constituent stocks coloured by day change
- Historical flow trend (monthly)

#### AI Stock Chat
- Claude-powered conversational interface
- Context-injected with: stock fundamentals, recent news,
  shareholding, concall summaries
- Conversation history persisted in SQLite
- Supports multi-turn analysis

#### Swing Trade Tracker
- Log swing trade setups: entry, target, stop-loss, rationale
- Track open vs closed trades
- P&L per trade, win rate summary

#### Thesis Journal
- One thesis entry per stock, stored in Notion via MCP
- Fields: bull case, bear case, key risks, target price,
  conviction level, review date
- Thesis health badge surfaced on Portfolio and Stock Detail pages

---

### Non-Functional Requirements

#### Performance
- Dashboard must load in under 2 seconds on first paint
- All data tables must handle up to 500 rows without pagination lag
- React Query caching to prevent redundant API calls on tab switch
- SQLite WAL mode for concurrent read performance

#### Reliability
- All external data fetches (Tapetide, Finnhub, Kite) must have
  try/catch with graceful fallback — never crash the UI on API failure
- Scheduled jobs (APScheduler) must log failures to the database,
  not silently drop
- Migration runner must be idempotent — safe to run on every startup

#### Usability
- Designed for long daily sessions — no eye strain, high data density
- All financial numbers must use JetBrains Mono for column alignment
- Color must never be the only signal — always pair gain/loss color
  with a label or icon for accessibility
- Empty states on every list/table component — never a blank screen

#### Maintainability
- No hardcoded values anywhere — tokens, constants, and config only
- One migration file per schema change — never edit applied files
- All components export via barrel index — never deep import paths
- Backend routes stay thin — business logic lives in fetchers and db.py

#### Out of Scope
The following are explicitly excluded from this project:
- Mutual funds and ETF tracking
- Derivatives (F&O) positions
- Tax calculation or P&L statements for filing
- IPO tracking
- Multi-user support or authentication

The schema includes an asset_type field on key tables for future
extensibility if needed.

---

### Tech Stack

Frontend:   React + Vite + Tailwind CSS (port 5173)
Backend:    Python + FastAPI + SQLite (port 8000)
Migrations: Custom versioned SQL runner (no ORM)
Charts:     Recharts
TV Chart:   TradingView Lightweight Widget (Stock Detail page)
Icons:      Lucide React
Data:       Tapetide MCP, Finnhub MCP, Kite (Zerodha) MCP, yfinance
Notifs:     Telegram bot (python-telegram-bot)
AI:         Claude via Anthropic API
            (concall summaries, AI chat, weekly reports)
Thesis:     Notion via MCP

---

### Repository Structure

equity-research/
├── frontend/                    # React + Vite (port 5173)
│   └── src/
│       ├── components/          # 57 reusable UI components
│       │   └── index.js         # Barrel export — always import from here
│       ├── pages/               # 11 page components (one per route)
│       ├── hooks/               # Custom React hooks
│       ├── services/            # Axios API service functions
│       ├── styles/
│       │   └── tokens.css       # CSS custom properties (design tokens)
│       └── App.jsx              # Route definitions
│   ├── tailwind.config.js       # Tailwind token definitions (source of truth)
│   └── package.json
│
├── backend/                     # FastAPI (port 8000)
│   ├── api/
│   │   ├── main.py              # App entry point, mounts all routes
│   │   └── routes/              # 11 route files (one per page domain)
│   ├── data/
│   │   ├── db.py                # SQLite connection + migration runner
│   │   └── fetchers/            # One fetcher per data source
│   │       ├── tapetide.py
│   │       ├── finnhub.py
│   │       ├── kite.py
│   │       ├── yfinance.py
│   │       └── macro.py
│   ├── migrations/              # Versioned .sql files (0001_, 0002_, ...)
│   ├── notifications/           # Telegram alert logic
│   ├── reports/                 # Weekly report generation
│   └── requirements.txt
│
├── DESIGN.md                    # Typography, spacing, elevation rules
└── README.md

---

### 11 Pages (React Routes)

/                  → Dashboard
/portfolio         → Portfolio
/stock/:ticker     → Stock Detail
/watchlist         → Watchlist
/earnings          → Earnings Tracker
/news              → News Tab
/screener          → Screener
/sector            → Sector Analysis
/chat              → AI Stock Chat
/swing             → Swing Trade
/thesis            → Thesis Journal

---

### Database

SQLite in WAL mode. 17 tables. Custom versioned migration system.
Applied versions tracked in a schema_migrations table (auto-created
by the runner on first boot).

Tables:
  stocks                price_history         fundamentals_cache
  shareholding_history  watchlist             news
  earnings              concall_summaries     screener_presets
  sector_data_cache     swing_trades          thesis_journal
  quick_notes           chat_history          weekly_reports
  macro_cache           telegram_log

Migration conventions:
- Files named 0001_init.sql, 0002_description.sql etc.
- run_migrations() called on every FastAPI startup — safe to run
  repeatedly, applies only unapplied versions
- Never edit an already-applied migration file — always add a new
  numbered file for any schema change
- Applied versions tracked in schema_migrations table

---

### MCP Integrations

Tapetide    mcp-remote → https://mcp.tapetide.com/mcp   Requires TAPETIDE_API_KEY
Kite        mcp-remote → https://mcp.kite.trade/mcp     No API key needed
Finnhub     npx aigroup-finnhub-mcp                     Requires FINNHUB_API_KEY
Notion      Notion official MCP                          Requires NOTION_API_KEY
Anthropic   Direct API                                   Requires ANTHROPIC_API_KEY
                                                         Concall summaries,
                                                         AI chat, weekly reports

---

### Environment Variables

TAPETIDE_API_KEY=
FINNHUB_API_KEY=
ANTHROPIC_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NOTION_API_KEY=
NOTION_DATABASE_ID=
DATABASE_PATH=

---

### Design System — Quant Precision

Mode:      Light only
Accent:    #0EA882 (Tapetide brand green)
Base:      Zinc scale (Claude Desktop light mode inspired)
Elevation: Tonal layers only — no box shadows
Depth:     bg-page → bg-surface → bg-muted

Font UI:      Inter          (labels, headings, body text)
Font numbers: JetBrains Mono (prices, percentages, ratios, volumes)
              Always use className="font-mono" for any numeric value

Color tokens:
  bg-page          #FAFAF9   Page background
  bg-surface       #FFFFFF   Cards, panels, nav
  bg-muted         #F4F4F5   Metric cells, hover states
  bg-accent        #F0FBF7   Accent-tinted backgrounds
  border-default   #E4E4E7   Cards, inputs, tables
  border-subtle    #F0F0EF   Table rows, dividers
  border-strong    #D4D4D8   Focused inputs
  text-primary     #18181B   Headings, values
  text-secondary   #52525B   Labels, body
  text-muted       #A1A1AA   Hints, timestamps
  accent           #0EA882   Primary CTA, active nav, ticker labels
  accent-hover     #0C9070   Hover state for accent
  gain             #059669   Positive P&L, beat earnings
  loss             #EF4444   Negative P&L, miss, stop loss
  warning          #F59E0B   Alerts, RSI extreme
  info             #2563EB   Links, info badges

Badge tint pairs (background / border):
  gain-bg / gain-border         #F0FBF7 / #B9EFE1
  loss-bg / loss-border         #FEF2F2 / #FECACA
  warning-bg / warning-border   #FFFBEB / #FDE68A
  info-bg / info-border         #EFF6FF / #BFDBFE

Full token definitions in frontend/tailwind.config.js and
frontend/src/styles/tokens.css.

Component library:
- 57 reusable components in frontend/src/components/
- Designed in Google Stitch, exported as JSX + Tailwind,
  implemented via Antigravity
- Always import via barrel: import { X, Y } from '../components'

---

### Coding Conventions

- No hardcoded hex values — Tailwind token classes only
  (text-gain, bg-accent, border-default etc.)
- All prices and numbers — className="font-mono" always
- PropTypes on every component — no TypeScript
- Barrel imports — always import { X } from '../components'
  never import directly from the component file path
- API calls — axios to /api/* — Vite proxies to FastAPI port 8000
- No ORM — raw SQL only via db.py — schema lives in migration files
- Telegram deduplication — write to telegram_log before sending,
  check for existing row first
- Schema changes — never edit applied migration files, always add
  a new numbered file
- Error handling — all external API calls must have try/catch,
  never let a failed fetch crash the UI
- Empty states — every list and table component must handle the
  empty case explicitly

---

### Running Locally

Prerequisites: Node.js 18+, Python 3.11+, pyenv recommended

Frontend:
  cd frontend
  npm install
  npm run dev
  Runs on http://localhost:5173

Backend:
  cd backend
  python -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  uvicorn api.main:app --reload
  Runs on http://localhost:8000

Copy .env.example to .env and fill in all keys before starting.

---

### Reference Files

Always refer to these files when making decisions:

  frontend/tailwind.config.js       Tailwind token definitions
  frontend/src/styles/tokens.css    CSS custom properties
  backend/migrations/0001_*.sql     Full database schema
  DESIGN.md                         Typography, spacing, elevation
  frontend/src/components/index.js  All 57 component exports