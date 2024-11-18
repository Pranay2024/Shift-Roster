import React, { useState } from 'react';
import axios from 'axios';

const ShiftManager = ({ users }) => {
  const [userId, setUserId] = useState('');
  const [shift, setShift] = useState('');
  const shiftTypes = ['Morning', 'Afternoon', 'Night', 'Evening', 'Late', 'Flexible'];

  // Handle shift assignment
  const assignShift = () => {
    if (!userId || !shift) {
      alert("Please select both a user and a shift");
      return;
    }

    axios.post('http://44.202.249.165/assign-shift', { userId, shift })
      .then(response => {
        alert(response.data.message);
        // Update the shift in the local state
        const updatedUsers = users.map(user =>
          user.id === parseInt(userId) ? { ...user, shift } : user
        );
        // Trigger state update in the parent component
        setUserId('');
        setShift('');
      })
      .catch(error => {
        console.error('There was an error assigning the shift!', error);
      });
  };

  return (
    <div>
      <h2>Manage Shifts</h2>
      <select onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setShift(e.target.value)}>
        <option value="">Select Shift</option>
        {shiftTypes.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <button onClick={assignShift}>Assign Shift</button>

      <h3>Assigned Shifts</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}: {user.shift || 'No shift assigned'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShiftManager;

