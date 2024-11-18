const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());             // Enables cross-origin requests
app.use(bodyParser.json());  // Parses incoming JSON data

const PORT = 5000;

// Define shift types (6 shifts as per your requirement)
const shiftTypes = ['Morning', 'Afternoon', 'Night', 'Evening', 'Late', 'Flexible'];

// Hardcoded user data with 40 people (in a real app, this would be stored in a database)
const users = [];
for (let i = 1; i <= 40; i++) {
  users.push({ id: i, name: `User ${i}`, shift: null }); // Each user has no assigned shift initially
}

// Route to get all users and their assigned shifts
app.get('/shifts', (req, res) => {
  res.json(users);
});

// Route to assign a shift to a user
app.post('/assign-shift', (req, res) => {
  const { userId, shift } = req.body;

  if (!shiftTypes.includes(shift)) {
    return res.status(400).json({ error: 'Invalid shift type' });
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.shift = shift;
  res.status(200).json({ message: `Shift ${shift} assigned to ${user.name}` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

