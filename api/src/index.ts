import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { Connection, createConnection } from 'typeorm';
import { Reservation, Inventory } from './entities';

const app: Application = express();
const port = 9090; // default port to listen

app.use(cors());
app.use(bodyparser.json({ type: 'application/json' }));
app.use(bodyparser.urlencoded({ extended: true }));

createConnection({
  type: 'postgres',
  url: 'postgres://root:password@db/wisely_test',
  entities: [Reservation, Inventory]
}).then((connection: Connection) => {
  
  /*******************************
   * /reservation Endpoints
   *******************************/

  const RESERVATION = connection.getRepository(Reservation);

  app.post('/reservations', async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const dbResponse = await RESERVATION
        .createQueryBuilder()
        .insert()
        .into(Reservation)
        .values( [ { ...body } ] )
        .execute();
      res.status(200).json({ ...body, id: dbResponse.identifiers[0].id });
    } catch {
      res.status(400).send('Your reservation could not be created.');
    }
  });

  app.get('/reservations', async (req: Request, res: Response) => {
    try {
      const allReservations = await RESERVATION.find();
      res.status(200).json(allReservations);  
    } catch {
      res.status(400).send('Could not fetch reservations.');
    }
  });

  /*******************************
   * /inventory Endpoints
   *******************************/

  const INVENTORY = connection.getRepository(Inventory);

  app.get('/inventory', async (req: Request, res: Response) => {
    try {
      const date = req.query.date;
      if (!!date && date !== 'undefined') {
        const dateInventory: Inventory[] = await INVENTORY.find({ where: { date: date } });
        const dateReservations: Reservation[] = await RESERVATION.find({ where: { date: date } });
        res.status(200).json(
          dateInventory.map((inv: Inventory) => {
            const numberReserved = dateReservations.filter(res => res.date === inv.date && res.time === inv.time).length;
            return {
              ...inv,
              available: inv.seatings > numberReserved
            };
          })
        );
      } else {
        res.status(400).send('Please pass a date query. Ex: /inventory?date=2020-09-20');
      }
    } catch {
      res.status(400).send('Could not fetch inventory.');
    }
  });

  /*******************************
   * /test Endpoints
   *******************************/

  app.get('/test', (req: Request, res: Response) => {
    res.send('All good.');
  });

  app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
  });

})
.catch(error => {
  console.error('Connection could not be created');
  console.error(error);
});
