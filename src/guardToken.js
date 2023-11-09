import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const requireAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Kontrollera autentiseringen när komponenten monteras
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
      }
    }, [navigate]);

    
    const token = localStorage.getItem('token');
    if (!token) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  
  return AuthenticatedComponent;
};

export default requireAuth;
