
  -- Add SQL in this file to create the database tables for your API
  CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  