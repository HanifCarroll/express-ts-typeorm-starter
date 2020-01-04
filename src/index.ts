import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { routes } from './routes';

createConnection()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.get('/', (_req, res) => res.json({ success: 'Hooray!' }));
    app.use('/api', routes);
    app.get('*', (_req, res) =>
      res.status(404).json({ error: 'This route does not exist.' }),
    );

    app.listen(3000, () => {
      console.log('Server started on port 3000!');
    });
  })
  .catch(error => console.log(error));
