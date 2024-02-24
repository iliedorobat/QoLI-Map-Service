import app from './app.ts';

const port = 3070;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
