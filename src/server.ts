import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes/routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

const port = process.env.PORT || 3333;

app.listen(port, () => console.info(`Server is running on port ${port}!`));
