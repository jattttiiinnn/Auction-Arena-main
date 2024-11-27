const { Client } = require('pg');
// Create a new client instance and connect to PostgreSQL
const client = new Client({
  user: 'postgres',           // Your PostgreSQL username
  host: 'localhost',       // Database server address (use localhost if local)
  database: 'arena',     // Database name
  password: 'Satsahib@123', // Your PostgreSQL password
  port: 5432,              // Default PostgreSQL port
});

client.connect();

// Example: Query the 'arena' table
client.query('SELECT * FROM arena;', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res.rows); // Prints the rows from the 'arena' table
  }

  client.end(); // Close the connection
});

// Route to handle form submissions
app.post('/submit-message', async (req, res) => {
  const { fullName, email, message } = req.body;

  // Insert query
  const query = `
    INSERT INTO messages (full_name, email, message)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const result = await client.query(query, [fullName, email, message]);
    res.status(200).json({
      message: 'Data inserted successfully!',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting data:', err.stack);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});