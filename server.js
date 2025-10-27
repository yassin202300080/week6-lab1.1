const { app } = require('./index.js');

// Start the server (no database connection)
const PORT = 3000;

// Start listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});