import { app } from './app';

const port = process.env.PORT || 3333;

app.listen(port, () => console.info(`Server is running on port ${port}!`));
