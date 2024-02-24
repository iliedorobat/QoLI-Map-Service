import Express from 'express';
import router from '#src/stats/stats.router.js';

const app = Express();

// Configuring Express to automatically parse the incoming JSON to an object
app.use(Express.json());

app.use(router);

export default app;
