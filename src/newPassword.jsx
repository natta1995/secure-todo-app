import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const resetToken = searchParams.get('resetToken'); 


  const resetPassword = () => {
    fetch('http://localhost:3001/api/users/reset-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': resetToken
      },
      body: JSON.stringify({ newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Hantera svaret från din backend
        navigate('/'); // Omdirigera till loginsidan
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Återställ lösenord</h2>
      <div className="form-group">
        <label htmlFor="newPassword">Nytt lösenord:</label>
        <input
          type="password"
          className="form-control"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={resetPassword}>
        Återställ lösenord
      </button>
    </div>
  );
};

export default ResetPassword;


