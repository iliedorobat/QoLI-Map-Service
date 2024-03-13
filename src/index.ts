import app from './app.ts';
import {PORT} from './app.const.js';

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
