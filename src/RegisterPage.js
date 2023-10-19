import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    const user = {
      email,
      password,
      username,
      role: 'user', 
    };

    try {
      
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert('Registreringen lyckades!');
      } else {
        const data = await response.json();
        alert(`Fel vid registrering: ${data.error}`);
      }
    } catch (error) {
      console.error('Något gick fel:', error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registrera dig</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">E-post:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Användarnamn:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegister}>
          Registrera
        </button>
        <p>Har du redan ett konto? <Link to="/">Logga in</Link></p>
      </form>
    </div>
  );
}

export default Registration;
