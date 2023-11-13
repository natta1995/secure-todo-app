import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgottenPassword() {
  const [email, setEmail] = useState('');

  const requestPasswordReset = async (email) => {
    try {
      const response = await fetch('http://localhost:3001/api/users/reset-password-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Meddelande från servern
        // Visa ett meddelande för användaren att kolla sin e-post för token
      } else {
        console.error('Fel vid begäran om lösenordsåterställning');
      }
    } catch (error) {
      console.error('Något gick fel:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Återställ lösenord</h1>
      <div className="form-group">
        <label htmlFor="email">E-postadress:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={() => requestPasswordReset(email)}>
        Begär återställning av lösenord
      </button>
    </div>
  );
}

export default ForgottenPassword;

