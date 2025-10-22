import express from 'express'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/customItemsController.js'

const router = express.Router()

// GET all custom items
router.get('/items', getAllItems)

// GET one custom item by ID
router.get('/items/:id', getItemById)

// POST create a new custom item
router.post('/items', createItem)

// PUT update an existing custom item
router.put('/items/:id', updateItem)

// DELETE remove a custom item
router.delete('/items/:id', deleteItem)

export default router
