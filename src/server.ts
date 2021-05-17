import express from 'express';

import { router } from './routes/routes';

const app = express();

app.use(express.json());

app.use(router);

const port = process.env.PORT || 3333;

app.listen(port, () => console.info(`Server is running on port ${port}!`));
