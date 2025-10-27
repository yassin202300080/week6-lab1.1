const express = require('express');
const tripRouter = require('./routes/tripRoutes.js');


// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON data from request bodies
app.use(express.json());


app.use('/trips', tripRouter);


module.exports = {
  app,
};