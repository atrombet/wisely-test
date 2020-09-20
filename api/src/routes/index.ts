import express from 'express';
import inventoryRouter from './inventoryRouter';
import reservationsRouter from './reservationsRouter';

const router = express.Router();

// Main router entry point.

router.use('/reservations', reservationsRouter);
router.use('/inventory', inventoryRouter);

export default router;