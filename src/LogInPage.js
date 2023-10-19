import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

  const credentials = { email, password };

    fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
    
        if (data.token) {
         
          localStorage.setItem('token', data.token);
          console.log("Du är inloggad")
        } else {
          alert('Ogiltiga inloggningsuppgifter');
        }
      });
  };

  return (
    <div className="login-container">
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-post:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lösenord:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Logga in</button>
        <p>Har du inte ett konto? <Link to="/register">Registrera dig här</Link></p>
      </form>
    </div>
  );
}

export default Login;
