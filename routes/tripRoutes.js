const express = require('express');
const {
  createTrip,
  retrieveAllTrips,
} = require('../controllers/tripController.js');

const tripRouter = express.Router();

// All trips
tripRouter
  .route('/')
  .post(createTrip)        // Add new trip
  .get(retrieveAllTrips);  // Get all trips


module.exports = tripRouter;