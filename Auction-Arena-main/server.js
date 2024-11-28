const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bodyParser = require('body-parser'); // Import body-parser
const app = express();
const PORT = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// PostgreSQL client configuration
const client = new Client({
  user: 'postgres',             // Your PostgreSQL username
  host: 'localhost',
  database: 'arena',
  password: 'Satsahib@123',
  port: 5432,                // Default port
});

client.connect();

// Route to handle form submission and insert data into the database
app.post('/submit', (req, res) => {
  const { name, email, password } = req.body;

  // Insert the submitted data into the 'arena' table
  client.query(
    'INSERT INTO arena (name, email, password) VALUES ($1, $2, $3)',
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data into database');
      } else {
        res.status(200).send('Signup Successful! 🎉, Welcome to AuctionArena. We are excited to have you onboard 👉 You can now explore your account and start bidding.📩 Check your email for a confirmation message and additional details. If you need help, feel free to contact auctionarenaofficial@gmail.com or visit our Help Center.');
      }
    }
  );
});

// Route to handle form submissions
app.post('/Message', async (req, res) => {
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
      message: 'Signup Successful! 🎉 Welcome to AuctionArena. We are excited to have you onboard 👉 You can now explore your account and start bidding.📩 Check your email for a confirmation message and additional details. If you need help, feel free to contact auctionarenaofficial@gmail.com or visit our Help Center.',
      data: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting data:', err.stack);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

// Route to handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // console.log('Received login request with:', email, password);

// Route to handle placing bids
app.post('/place-bid', (req, res) => {
  const { itemId, bidAmount } = req.body;

  // Validate inputs
  if (!itemId || !bidAmount) {
    return res.status(400).send('Item ID and bid amount are required.');
  }

  // Insert the bid into the 'bids' table
  client.query(
    'INSERT INTO bids (item_id, bid_amount) VALUES ($1, $2)',
    [itemId, bidAmount],
    (err, result) => {
      if (err) {
        console.error('Error placing bid:', err);
        return res.status(500).send('Failed to place bid.');
      }

      res.status(200).send('Bid placed successfully!');
    }
  );
});

  // Query the database to check if the email and password match
  client.query(
    'SELECT * FROM arena WHERE email = $1 AND password = $2',
    [email, password],
    (err, result) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Error during login');
      }

      if (result.rows.length > 0) {
        // If credentials are correct, send a success response
        res.redirect('/homepage.html');
        // res.send('Login successful!');
      } else {
        // If no matching user found
        res.status(401).send('Invalid email or password');
      }
    }
  );
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



