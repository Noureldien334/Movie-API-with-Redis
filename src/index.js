import express from 'express';
import { movieRouter } from './movieRouter.js';

const port = 3000;
const app  = express();

app.use('/movie/',movieRouter);

app.listen(port, () => {
    console.log("Server is Running");
})