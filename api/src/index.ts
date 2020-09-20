import express, { Application } from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import { createConnection } from 'typeorm';
import { Reservation, Inventory } from './entities';
import router from './routes';

const app: Application = express();
const port = 9090; // default port to listen

app.use(cors());
app.use(bodyparser.json({ type: 'application/json' }));
app.use(bodyparser.urlencoded({ extended: true }));

createConnection({
  type: 'postgres',
  url: 'postgres://root:password@db/wisely_test',
  entities: [Reservation, Inventory]
}).then(() => {

  app.use('/', router);

  app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
  });

})
.catch(error => {
  console.error('Connection could not be created');
  console.error(error);
});
