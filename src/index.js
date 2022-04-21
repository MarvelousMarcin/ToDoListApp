const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./mongoose/mongoose");

const app = express();
const publicDir = path.join(__dirname, "../public");
const port = process.env.PORT | 3000;

app.set("view engine", "hbs");
app.set("views", publicDir);

const taskRoute = require("./routes/task");
const userRoute = require("./routes/user");
const generalRoute = require("./routes/general");

app.use(express.static(publicDir));
app.use(express.json());
app.use(taskRoute);
app.use(userRoute);
app.use(generalRoute);

app.listen(port, () => console.log(`App is running on port ${port}`));
