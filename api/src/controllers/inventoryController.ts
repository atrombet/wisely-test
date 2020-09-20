import { Inventory, Reservation } from '../entities';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { getTimesFromRange } from '../functions';

/**
 * Gets all inventory for the given date. Date should be passed as a parameter. EX: ?date=2020-09-16 
 */
export const getInventoryByDate = async (req: Request, res: Response) => {
  try {
    const date = req.query.date;
    const invRepo = getRepository(Inventory);
    const resRepo = getRepository(Reservation);
    if (!!date && date !== 'undefined') {
      const dateInventory: Inventory[] = await invRepo.find({ where: { date: date } });
      const dateReservations: Reservation[] = await resRepo.find({ where: { date: date } });
      res.status(200).json(
        dateInventory.map((inv: Inventory) => {
          const numberReserved = dateReservations.filter(res => res.date === inv.date && res.time === inv.time).length;
          return {
            ...inv,
            available: inv.parties > numberReserved
          };
        })
      );
    } else {
      res.status(400).send('Please pass a date query. Ex: /inventory?date=2020-09-20');
    }
  } catch {
    res.status(400).send('Could not fetch inventory.');
  }
};

/**
 * Creates inventory given a date, range of 15 minute segments in the day i.e. [40, 80], and a number of parties per segment.
 */
export const createInventory = async (req: Request, res: Response) => {
  try {
    const { range, date, parties } = req.body;
    const invRepo = getRepository(Inventory);
    if (range) {
      const times = getTimesFromRange(range);
      await invRepo
        .createQueryBuilder()
        .insert()
        .into(Inventory)
        .values(times.map(time => {
          return { date, parties, time }
        }))
        .execute();
      const dateInventory = await invRepo.find({ where: { date: date } });
      res.status(200).json(dateInventory);
    } else {
      res.status(400).send(`
        Please include a "range" property in the body.
        Range should be an array of two integers from 0 to 95 where 0 = 12:00 AM and 95 = 11:45 PM.
        EX: [3, 87]
      `);
    }
  } catch {
    res.status(400).send('Inventory could not be created.');
  }
};
