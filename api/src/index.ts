import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { Reservation, Seatings } from './models';

const app: Application = express();
const port = 9090; // default port to listen

app.use(cors());
app.use(bodyparser.json({ type: 'application/json' }));
app.use(bodyparser.urlencoded({ extended: true }));

let reservations: Reservation[] = [
  { id: 1, name: 'Anthony', email: 'anthony@email.com', partySize: 4, date: '2020-09-16', time: '2:15' },
  { id: 2, name: 'Joe', email: 'joe@email.com', partySize: 5, date: '2020-09-16', time: '2:30' },
  { id: 3, name: 'Teri', email: 'teri@email.com', partySize: 3, date: '2020-09-17', time: '3:00' },
];

let inventory: Seatings[] = [
  { date: '2020-09-16', time: '2:00', amount: 1 },
  { date: '2020-09-16', time: '2:15', amount: 2 },
  { date: '2020-09-16', time: '2:30', amount: 3 },
  { date: '2020-09-16', time: '2:45', amount: 4 },
  { date: '2020-09-16', time: '3:00', amount: 1 },
  { date: '2020-09-16', time: '3:15', amount: 2 },
  { date: '2020-09-16', time: '3:30', amount: 3 },
  { date: '2020-09-16', time: '3:45', amount: 4 },
  { date: '2020-09-17', time: '3:00', amount: 1 },
  { date: '2020-09-17', time: '3:15', amount: 2 },
  { date: '2020-09-17', time: '3:30', amount: 3 },
  { date: '2020-09-17', time: '3:45', amount: 4 },
  { date: '2020-09-17', time: '4:00', amount: 1 },
  { date: '2020-09-17', time: '4:15', amount: 2 },
  { date: '2020-09-17', time: '4:30', amount: 3 },
  { date: '2020-09-17', time: '4:45', amount: 4 }
];

app.post('/reservations', (req: Request, res: Response) => {
  const { body } = req;
  const id = Math.max(...reservations.map(r => r.id)) + 1;
  const newReservation = { id, ...body };
  reservations.push(newReservation);
  res.status(200).json(newReservation);
});

app.get('/reservations', (req: Request, res: Response) => {
  res.status(200).json(reservations);
});

app.get('/inventory', (req: Request, res: Response) => {
  const date = req.query.date;
  if (!!date && date !== 'undefined') {
    res.status(200).json(
      inventory
        .filter(inv => inv.date === date)
        .map(inv => {
          const numberReserved = reservations.filter(res => res.date === inv.date && res.time === inv.time).length;
          return {
            ...inv,
            available: inv.amount > numberReserved
          }
        })
    );
  } else {
    res.status(400).send('Please pass a date query. Ex: /inventory?date=2020-9-20');
  }
});

app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }` );
});
