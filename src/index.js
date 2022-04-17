const express = require('express');
const Task = require('./models/Task');
require('./mongoose/mongoose');

const port = process.env.PORT | 3000;

const app = express();
const taskRoute = require('./routes/task');

app.use(express.static('public'))
app.use(express.json());
app.use(taskRoute);




app.listen(port, () => console.log(`App is running on port ${port}`));