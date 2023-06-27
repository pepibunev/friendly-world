const express = require('express');

const handlebarsConfig = require('./config/handlebarsConfig');
const expressConfig = require('./config/expressConfig');
const dbConnect = require('./config/dbConfig');
const routes = require('./routes');

const app = express();
const PORT = 3000;

handlebarsConfig(app);
expressConfig(app);

dbConnect()
    .then(() => console.log('DB Connected successfully'))
    .catch(err => console.log('DB error:', err.message));

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))