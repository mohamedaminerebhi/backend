
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create an Express application
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'database-3-tier-app.ctbfvcbzmaxw.us-east-1.rds.amazonaws.com',
  user: 'database-3-tier-app',
  password: 'rebhi1010',
  database: 'formulaire'
});

// Define a route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, phone } = req.body;

  // Use connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Perform the query
    connection.query('INSERT INTO your_table_name (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (queryErr, results) => {
      // Release the connection
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Query successful
      res.status(200).send('Data inserted successfully');
    });
  });
});

// Start the server
const port = 3000; // Or any other port you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

