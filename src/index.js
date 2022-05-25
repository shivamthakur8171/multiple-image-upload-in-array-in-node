const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const connect = require('./db/conn');
const landingRoute = require('./route/routes');

const port = process.env.PORT;
const app = express();


connect.Connect()
app.use(express.json());
app.use(landingRoute);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

