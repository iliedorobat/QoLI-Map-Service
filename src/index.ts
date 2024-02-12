import app from './app.ts';
import router from './routers/router.ts';

const port = 3070;

app.use(router);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
