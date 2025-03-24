
  -- Add SQL in this file to create the database tables for your API
  CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author_id INTEGER NOT NULL,
      published_year INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  