const express = require("express");
const app = express();
app.use(express.json());

const port = 2016;

const home = require('./routes/route');
app.use('/',home)
app.listen(port, () => {
    console.log(`We connected successfully with ${port} port no.`)
});