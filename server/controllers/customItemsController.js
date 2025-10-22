import { pool } from '../config/database.js'

// Get all custom items
export async function getAllItems(req, res) {
  try {
    const result = await pool.query('SELECT * FROM custom_items ORDER BY id ASC')
    res.json(result.rows)
  } catch (err) {
    console.error('❌ Error fetching items:', err)
    res.status(500).json({ error: 'Server error fetching items' })
  }
}

export async function getItemById(req, res) {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM custom_items WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error('❌ Error fetching item by ID:', err)
    res.status(500).json({ error: 'Server error fetching item by ID' })
  }
}

// Create a new item
export async function createItem(req, res) {
  try {
    const { name, base_price, features, total_price } = req.body
    const result = await pool.query(
      `INSERT INTO custom_items (name, base_price, features, total_price)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, base_price, features, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('❌ Error creating item:', err)
    res.status(500).json({ error: 'Server error creating item' })
  }
}

// Update an item
export async function updateItem(req, res) {
  try {
    const { id } = req.params
    const { name, base_price, features, total_price } = req.body
    const result = await pool.query(
      `UPDATE custom_items
       SET name=$1, base_price=$2, features=$3, total_price=$4
       WHERE id=$5
       RETURNING *`,
      [name, base_price, features, total_price, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error('❌ Error updating item:', err)
    res.status(500).json({ error: 'Server error updating item' })
  }
}

// Delete an item
export async function deleteItem(req, res) {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM custom_items WHERE id=$1', [id])
    res.json({ message: 'Item deleted successfully' })
  } catch (err) {
    console.error('❌ Error deleting item:', err)
    res.status(500).json({ error: 'Server error deleting item' })
  }
}
