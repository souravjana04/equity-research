import sqlite3
import os
import glob
import logging

logger = logging.getLogger(__name__)

# Default database path, can be overridden by env
DB_PATH = os.getenv("DATABASE_PATH", "./equity_research.db")

def get_db():
    """
    Returns a SQLite connection to the database.
    Uses WAL mode and foreign keys ON.
    """
    # ensure directory exists
    os.makedirs(os.path.dirname(os.path.abspath(DB_PATH)), exist_ok=True)
    
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    
    # Configure Pragmas
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA foreign_keys = ON;")
    
    return conn

def run_migrations():
    """
    Runs all pending SQLite migrations from the backend/migrations/ folder.
    """
    migrations_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'migrations')
    
    if not os.path.exists(migrations_dir):
        logger.warning(f"Migrations directory not found at {migrations_dir}")
        return

    # Find all .sql files and sort them
    migration_files = sorted(glob.glob(os.path.join(migrations_dir, '*.sql')))
    
    if not migration_files:
        return

    conn = get_db()
    
    try:
        # Check if schema_migrations table exists, create it if not
        # (Though our first migration should create it, we need it to check for applied migrations)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS schema_migrations (
                version     INTEGER PRIMARY KEY,
                filename    TEXT NOT NULL,
                applied_at  TEXT NOT NULL DEFAULT (datetime('now'))
            );
        """)
        conn.commit()
        
        # Get applied migrations
        cursor = conn.cursor()
        cursor.execute("SELECT version FROM schema_migrations")
        applied_versions = {row["version"] for row in cursor.fetchall()}
        
        for file_path in migration_files:
            filename = os.path.basename(file_path)
            
            # Extract version from filename (e.g. 0001_initial_schema.sql -> 1)
            try:
                version_str = filename.split('_')[0]
                version = int(version_str)
            except ValueError:
                logger.warning(f"Skipping incorrectly named migration file: {filename}")
                continue
                
            if version in applied_versions:
                continue
                
            logger.info(f"Applying migration: {filename}")
            
            with open(file_path, 'r', encoding='utf-8') as f:
                sql_script = f.read()
                
            # Run migration in a transaction
            try:
                # begin transaction implicitly handled by connection
                cursor.executescript(sql_script)
                cursor.execute(
                    "INSERT INTO schema_migrations (version, filename) VALUES (?, ?)",
                    (version, filename)
                )
                conn.commit()
                logger.info(f"Successfully applied {filename}")
            except Exception as e:
                conn.rollback()
                logger.error(f"Failed to apply migration {filename}: {e}")
                raise e

    finally:
        conn.close()
