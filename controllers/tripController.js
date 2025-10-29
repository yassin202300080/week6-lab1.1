const { trips } = require('../models/Trip');
const { db } = require('../db.js')

/*// Retrieve all trips
const retrieveAllTrips = (req, res) => {
  const allTrips = trips;
  res.status(200).json({
    status: 'success',
    message: 'Trips retrieved successfully',
    results: allTrips.length,
    data: allTrips,
  });
};

// Create a new trip
const createTrip = (req, res) => {
  const {
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost,
    accommodationCost,
    mealCost,
    visaCost,
    transportationCost,
    currencyCode,
  } = req.body;

  if (
    !destinationName ||
    !location ||
    !continent ||
    !language ||
    !description
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide all required fields.',
    });
  }

  const newTrip = {
    id: trips.length + 1,
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost: flightCost || 0,
    accommodationCost: accommodationCost || 0,
    mealCost: mealCost || 0,
    visaCost: visaCost || 0,
    transportationCost: transportationCost || 0,
    currencyCode: currencyCode || 'N/A',
  };

  trips.push(newTrip);

  res.status(201).json({
    status: 'success',
    message: 'Trip created successfully',
    data: newTrip,
  });
};*/






// Create a new trip
const createTrip = (req, res) => {
    const {
        destinationName, location, continent, language, description,
        flightCost = 0, accommodationCost = 0, mealCost = 0, visaCost = 0, transportationCost = 0, currencyCode = 'N/A'
    } = req.body;

    if (!destinationName || !location || !continent || !language || !description) {
        return res.status(400).json({
            message:
                'Missing required fields: destinationName, location, continent, language, and description are mandatory.'
        });
    }

  const query = `
    INSERT INTO TRIP (
        DESTINATIONNAME, LOCATION, CONTINENT, LANGUAGE, DESCRIPTION, 
        FLIGHTCOST, ACCOMMODATIONCOST, MEALCOST, VISACOST, TRANSPORTATIONCOST, CURRENCYCODE
    ) 
     
        
    VALUES ('${destinationName}', '${location}', '${continent}', '${language}',
      '${description}','${flightCost}','${accommodationCost}','${mealcost}', 
      '${visacost}','${transportationCost}','${currencycode}'
    )
    `;

    db.run(query, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        };
   
        return res.status(201).json({
            message: 'Trip created successfully'
        });
    });

  };

  // Retrieve all trips
const retrieveAllTrips = (req, res) => {
  const id = req.parms.id;
  const query = 'SELECT * FROM TRIP';

  db.all(query, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error retrieving trips' });
    }

    return res.status(200).json({
      message: 'Trips retrieved successfully',
      data: rows
    });
  });
};

// Retrieve a single trip by ID
const retrieveTripById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM TRIP WHERE ID = ${id}`;

  db.get(query, (err, row) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error fetching trip' });
    }

    if (!row) return res.status(404).json({ message: 'Trip not found' });

    return res.status(200).json({ message: 'Trip retrieved successfully', data: row });
  });
};

// Update a trip by ID
const updateTripById = (req, res) => {
  const id = req.params.id;
  const {
    destinationName,
    location,
    continent,
    language,
    description,
    flightCost,
    accommodationCost,
    mealCost,
    visaCost,
    transportationCost,
    currencyCode
  } = req.body;

  const query = `
  UPDATE TRIP SET
    DESTINATIONNAME = '${destinationName}',
    LOCATION = '${location}',
    CONTINENT = '${continent}',
    LANGUAGE = '${language}',
    DESCRIPTION = '${description}',
    FLIGHTCOST = ${flightCost},
    ACCOMMODATIONCOST = ${accommodationCost},
    MEALCOST = ${mealCost},
    VISACOST = ${visaCost},
    TRANSPORTATIONCOST = ${transportationCost},
    CURRENCYCODE = '${currencyCode}'
  WHERE ID = ${id}
`;

db.run(query, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (this.changes === 0)
      return res.status(404).json({ message: 'Trip not found' });

    return res.status(200).json({ message: 'Trip updated successfully' });
  });
};

// Delete a trip by ID
const deleteTripByIds = (req, res) => {
  const id = Number(req.params.id);
  const index = trips.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Trip not found.',
    });
  }

  trips.splice(index, 1);

  res.status(204).json({
    status: 'success',
    message: 'Trip deleted successfully',
    data: null,
  });
};

    module.exports = {
  createTrip,
  retrieveAllTrips
};
