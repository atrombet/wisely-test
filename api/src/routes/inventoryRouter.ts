import express from 'express';
import { getInventoryByDate, createInventory } from '../controllers/inventoryController';

const inventoryRouter = express.Router();

// All /inventory Routes

// GET /inventory?date=YYYY-MM-DD
inventoryRouter.get('/', getInventoryByDate);

// POST /inventory
inventoryRouter.post('/', createInventory);

export default inventoryRouter;