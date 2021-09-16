import express from 'express';
import cors from 'cors';
import path from 'path';

import db from './models/index.js';
import routes from './routes/router.js';

import swaggerUi from 'swagger-ui-express';
// import * as swaggerFile from './swagger-output.json';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerFile = require('./swagger-output.json');

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

routes(app);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', express.static(path.join(__dirname, '../build')));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to To Do App.' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
