
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateTablePage = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User created:', data);
        // Clear the form or show success message
      } else {
        console.error('Error creating user:', data.message);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };


  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setName(e.target.value)}
          required
        />
       
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateTablePage;
