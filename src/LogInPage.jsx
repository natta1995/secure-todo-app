import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
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
          localStorage.setItem('user', JSON.stringify(data.user));
          console.log('Du är inloggad');

          // Omdirigera användaren till en annan sida efter inloggning
          navigate('/todo');
        } else {
          alert('Ogiltiga inloggningsuppgifter');
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card"> {/* Använd Bootstrap's card klass */}
            <div className="card-body"> {/* Använd Bootstrap's card-body klass */}
              <h2 className="card-title">Logga in</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">E-post:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Lösenord:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Logga in</button>
                <p>Har du inte ett konto? <Link to="/register">Registrera dig här</Link></p>
                <Link to="/password">Glömt lösenordet?</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default Login;


