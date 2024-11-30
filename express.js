// Import required libraries
const express = require('express');
const { find } = require('raganork-bot'); // TrueCaller lookup function
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// TrueCaller lookup function
const trueCaller = async (num) => {
  try {
    var res = await find(num, '', '');
  } catch {
    var res = false;
  }
  return res;
};

// API Endpoint for TrueCaller lookup
app.post('/api/truecaller', async (req, res) => {
  const phoneNumber = req.body.phone; // Get phone number from request body

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  let result = await trueCaller(phoneNumber.replace(/[^0-9]/g, "")); // Clean phone number input
  if (result === false) {
    return res.status(404).json({ error: 'Number not found' });
  }

  res.json(result); // Return result to frontend
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
