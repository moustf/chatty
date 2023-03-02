import { app } from './server';

const port = app.get('port');

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server started http://localhost:${port}`));
