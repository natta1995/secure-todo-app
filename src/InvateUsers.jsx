
import React, { useState } from 'react';

const InviteUser = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInviteClick = () => {
    // Här kan du anropa en funktion som skickar inbjudningsmejl med den angivna e-postadressen
    if (email) {
      // Skicka inbjudan här
      // Exempel: Skicka e-postadressen till din backend för att hantera inbjudningen
      fetch('http://localhost:3001/api/users/invate-friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
        .then(() => {
          setEmail(''); // Återställ formuläret efter att inbjudningen har skickats
        })
        .catch((error) => console.error(error));
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
