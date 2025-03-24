
  -- Add SQL in this file to create the database tables for your API
  CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      director_id INTEGER NOT NULL,
      producer_id INTEGER NOT NULL,
      released_year INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  