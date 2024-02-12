import Express from 'express';

const app = Express();

// Configuring Express to automatically parse the incoming JSON to an object
app.use(Express.json());

export default app;
