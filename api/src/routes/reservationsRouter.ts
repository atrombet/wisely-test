import express from 'express';
import { getAllReservations, createReservation } from '../controllers/reservationsController';

const reservationsRouter = express.Router();

// All /reservations Routes

// GET /reservations
reservationsRouter.get('/', getAllReservations);

// POST /reservations
reservationsRouter.post('/', createReservation);

export default reservationsRouter;