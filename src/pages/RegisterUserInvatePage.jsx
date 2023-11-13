import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importera Bootstrap CSS
import { useNavigate } from 'react-router-dom';

function RegisterUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


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
        navigate('/'); // Omdirigera till loginsidan
      } else {
        const data = await response.json();
        alert(`Fel vid registrering: ${data.error}`);
      }
    } catch (error) {
      console.error('Något gick fel:', error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Registrera dig</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="email">E-post:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Användarnamn:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <button type="button" onClick={handleRegister} className="btn btn-primary">
                 Registrera
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;

