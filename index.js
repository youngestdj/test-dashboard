import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);
app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Dashboard api',
  })
);

app.all('*', (req, res) =>
  res.status(404).json({
    error: 'Page not found.',
  })
);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${process.env.PORT}`);
});

export default app;
