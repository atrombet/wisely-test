import { Reservation } from '../entities';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

/**
 * Gets all reservations
 */
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const resRepo = getRepository(Reservation);
    const allReservations = await resRepo.find();
    res.status(200).json(allReservations);  
  } catch {
    res.status(500).send('Could not fetch reservations.');
  }
};

/**
 * Creates a reservation
 */
export const createReservation = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const resRepo = getRepository(Reservation);
    const dbResponse = await resRepo
      .createQueryBuilder()
      .insert()
      .into(Reservation)
      .values( [ { ...body } ] )
      .execute();
    res.status(200).json({ ...body, id: dbResponse.identifiers[0].id });
  } catch {
    res.status(500).send('Your reservation could not be created.');
  }
};