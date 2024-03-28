const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
var bodyParser = require('body-parser')

const {connection} = require("./data/db");

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));
// create application/json parser
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(userRoutes);




app.listen(3000, () => {
    console.log("Listening on port 3000");
});