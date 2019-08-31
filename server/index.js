const express = require('express');
const { routes } = require('./routes');

const app = express();

const { PORT = 3001 } = process.env;
const serverUrl = `http://localhost:${PORT}`;

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Express Server is listening to ${serverUrl}`);
});
