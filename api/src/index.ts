import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
const app: Application = express();
const port = 9090; // default port to listen

app.use(cors());
app.use(bodyparser.json({ type: 'application/json' }));
app.use(bodyparser.urlencoded({ extended: true }));

let reservations = [
  { id: 1, name: 'Anthony', email: 'anthony@email.com', partySize: 4, date: '2020-09-16', time: '2:15' },
  { id: 2, name: 'Joe', email: 'joe@email.com', partySize: 5, date: '2020-09-16', time: '2:30' },
  { id: 3, name: 'Teri', email: 'teri@email.com', partySize: 3, date: '2020-09-17', time: '3:00' },
];

let inventory = [ '2:00', '2:15', '2:30', '2:45', '3:00', '3:15', '3:30', '3:45' ];

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
    res.status(200).json(inventory);
  } else {
    res.status(400).send('Please pass a date query. Ex: /inventory?date=2020-9-20');
  }
});

app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }` );
});
