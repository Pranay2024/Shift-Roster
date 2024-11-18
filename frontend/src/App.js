import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShiftManager from './ShiftManager';

function App() {
  const [users, setUsers] = useState([]);

  // Fetch all users and their assigned shifts
  useEffect(() => {
    axios.get('http://44.202.249.165:5000/shifts')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the shift data!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Shift Roster Management</h1>
      <ShiftManager users={users} />
    </div>
  );
}

export default App;

