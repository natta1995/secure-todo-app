// UserManagementModal-komponenten

import React from 'react';
import UserManagement from './components/UserList';

const UserManagementModal = ({ onClose, adminToken }) => {
  return (
    <div className="user-management-modal">
      <UserManagement adminToken={adminToken} />
      <button onClick={onClose} className="btn btn-danger">
        Stäng
      </button>
    </div>
  );
};

export default UserManagementModal;
