const { app } = require('./index.js');

const db_access = require('./db.js');
const db = db_access.db;

// Start the server (no database connection)
const PORT = 3000;

// Start listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);


// Initialize database tables
    db.run(db_access.createTripTable, (err) => {
        if (err) console.log('Error creating trip table:', err.message);
    });

    db.run(db_access.createUserTable, (err) => {
        if (err) console.log('Error creating trip table:', err.message);
    });

    // Start listening on the specified port
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});