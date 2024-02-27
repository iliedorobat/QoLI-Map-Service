import Express from 'express';
import cors from 'cors';
import router from '#src/stats/stats.router.js';

const app = Express();

// Configuring Express to automatically parse the incoming JSON to an object
app.use(Express.json());

app.use(cors());

app.use(router);

export default app;
