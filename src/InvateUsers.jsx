
import React, { useState } from 'react';

const InviteUser = () => {
  const [email, setEmail] = useState('');
  const token = localStorage.getItem('token');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInviteClick = () => {
    if (email && token) {
      fetch('http://localhost:3001/api/users/invate-friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setEmail(''); // Återställ e-postadressfältet
        // Hantera ett lyckat svar här, t.ex. visa ett meddelande till användaren
      })
      .catch((error) => {
        console.error('Det gick inte att skicka inbjudan:', error);
        // Hantera fel här, t.ex. visa ett felmeddelande till användaren
      });
    } else {
      // Hantera fallet när e-postadress eller token saknas
      console.error('E-postadress eller token saknas.');
    }
  };

  return (
    <div>
      <h2>Bjud in en vän</h2>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={handleEmailChange}
          placeholder="Ange e-postadressen"
        />
        <div className="input-group-append">
          <button onClick={handleInviteClick} className="btn btn-primary">
            Bjud in
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
