import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
const app: Application = express();
const port = 9090; // default port to listen

app.use(cors());
app.use(bodyparser.json({ type: 'application/json' }));
app.use(bodyparser.urlencoded({ extended: true }));

let reservations = [
  { id: 1, name: 'Anthony', email: 'atrombet@gmail.com', partySize: 4, date: '2020-9-16', time: '2:15' },
  { id: 2, name: 'Joe', email: 'atrombet@gmail.com', partySize: 5, date: '2020-9-16', time: '2:30' }
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

app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }` );
});
