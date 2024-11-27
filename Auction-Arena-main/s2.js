const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // For password hashing
const session = require('express-session'); // For session management
const app = express();
const PORT = 3001;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL client configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'arena',
  password: 'Satsahib@123',
  port: 5432,
});

client.connect();

// Session middleware
app.use(session({
  secret: 'your-secret-key', // A secret key to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
}));

// Route to handle user registration (with password hashing)
app.post('/submit', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  // Insert the submitted data into the 'arena' table
  client.query(
    'INSERT INTO arena (name, email, password) VALUES ($1, $2, $3)',
    [name, email, hashedPassword],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Error inserting data into database');
      }
      res.status(200).send('Data inserted successfully!');
    }
  );
});

// Route to handle login (with password comparison)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the email exists
  client.query(
    'SELECT * FROM arena WHERE email = $1',
    [email],
    async (err, result) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Error during login');
      }

      if (result.rows.length > 0) {
        // Compare the entered password with the hashed password in the database
        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          // If credentials are correct, store user info in the session
          req.session.user = user;
          return res.redirect('/homepage.html');
        } else {
          return res.status(401).send('Invalid email or password');
        }
      } else {
        return res.status(401).send('Invalid email or password');
      }
    }
  );
});

// Route for logging out (destroying the session)
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Error during logout');
    }
    res.redirect('/homepage.html');
  });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage
app.get('/', (req, res) => {
  // Check if the user is logged in
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
  } else {
    res.redirect('/homepage.html'); // Redirect to login if not logged in
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});