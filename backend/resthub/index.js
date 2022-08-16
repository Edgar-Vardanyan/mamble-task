// Import express
const express = require('express');
// Import Body parser

// CORS 

const cors = require('cors');


const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
// Initialise the app
const app = express();


app.use(cors())

// Import routes
const apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
const db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
const port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, () => {
    console.log("Running RestHub on port " + port);
});