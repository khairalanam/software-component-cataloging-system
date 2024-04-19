export interface Component {
  id: string
  catalogId: string | undefined
  name: string
  type: 'CODE' | 'DESIGN'
  description?: string
  data: string
  frequency?: number
  lastAccessed?: Date
  createdAt?: Date
}

// (
//   `
// CREATE TABLE IF NOT EXISTS components (
// id VARCHAR(17) PRIMARY KEY,
// name TEXT,
// type TEXT,
// catalog_id VARCHAR(16),
// data TEXT,
// description TEXT,
// frequency INTEGER DEFAULT 0,
// last_accessed DATETIME,
// created_at DATETIME,
// FOREIGN KEY (catalog_id) REFERENCES catalogs(id)
// )
// `
// )
