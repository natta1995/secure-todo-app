import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const requireAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Kontrollera autentiseringen när komponenten monteras
      const token = localStorage.getItem('token');
      if (!token) {
        // Om det inte finns någon token, navigera till login-sidan
        navigate('/');
      }
    }, [navigate]);

    // Om det finns en token, anta att användaren är autentiserad
    // och rendera den inlindade komponenten
    const token = localStorage.getItem('token');
    if (!token) {
      return null; // Returnera null medan navigeringen pågår
    }

    return <WrappedComponent {...props} />;
  };

  // Returnera den autentiserade komponenten
  return AuthenticatedComponent;
};

export default requireAuth;














// guardToken.js
/*import React from 'react';
import { useNavigate } from 'react-router-dom';

const requireAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();

    // Här kan du lägga till din logik för att kontrollera om användaren är autentiserad
    const token = localStorage.getItem('token');
    if (!token) {
      // Om det inte finns någon token, navigera till login-sidan
      navigate('/login');
      return null; // Du kan returnera null medan navigeringen pågår
    }

    // Om användaren är autentiserad, rendera den inlindade komponenten
    return <WrappedComponent {...props} />;
  };

  // Returnera komponenten som skapas av HOC
  return AuthenticatedComponent;
};

export default requireAuth;*/

