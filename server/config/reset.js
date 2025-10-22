// server/config/reset.js
import { pool } from './database.js'
import dotenv from 'dotenv'

dotenv.config()

async function resetDatabase() {
  try {
    console.log('🧹 Dropping existing tables (if any)...')

    await pool.query(`
      DROP TABLE IF EXISTS custom_items CASCADE;
    `)

    console.log('🧱 Creating new tables...')

    await pool.query(`
      CREATE TABLE custom_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        base_price NUMERIC(10,2) DEFAULT 0,
        features JSONB DEFAULT '{}',
        total_price NUMERIC(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    console.log('✅ Database tables created successfully!')
  } catch (err) {
    console.error('❌ Error resetting database:', err)
  } finally {
    await pool.end()
  }
}

resetDatabase()
