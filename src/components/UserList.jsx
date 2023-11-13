import React, { useState, useEffect } from 'react';

function UserManagement({ adminToken }) {
  const [users, setUsers] = useState([]);
 


  useEffect(() => {
    fetch('http://localhost:3001/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${adminToken}` // Du behöver administratörens JWT-token
      },
    })
      .then((response) => {
        if (!response.ok) {
          // Om responsen inte är ok, kasta ett fel för att gå till catch-blocket
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Kontrollera om datan är en array innan du sätter den i state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          // Om datan inte är en array, sätt en tom array eller hantera felet
          setUsers([]);
          console.error('Data received is not an array:', data);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [adminToken]);

  const handleRoleChange = (userId) => {
    // Hämta den nuvarande användarrollen från roleChanges-objektet
    const userToUpdate = users.find((user) => user.id === userId);
    const newRole = userToUpdate.role === 'user' ? 'admin' : 'user';
  
    // Skapa en PUT-förfrågan för att ändra användarrollen
    fetch(`http://localhost:3001/api/users/change-role/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ role: newRole })
    })
      .then((response) => {
        if (response.ok) {
          // Uppdatera användarens roll i det lokala tillståndet
          const updatedUsers = [...users];
          const userIndex = updatedUsers.findIndex((user) => user.id === userId);
          updatedUsers[userIndex].role = newRole;
          setUsers(updatedUsers);
        } else {
          console.error('Kunde inte ändra användarens roll');
        }
      })
      .catch((error) => console.error(error));
  };
  
  const handleUserDelete = (userId) => {
    // Skapa en DELETE-förfrågan för att ta bort användaren
    fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      }
    })
      .then((response) => {
        if (response.ok) {
          // Uppdatera användarlistan efter borttagningen
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
        } else {
          console.error('Kunde inte ta bort användaren');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Change user rolls</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== 'Creater' && (
                  <>
                <button onClick={() => handleRoleChange(user.id)}>
                  Ändra
                </button>
                <button onClick={() => handleUserDelete(user.id)}>
                  Radera
                </button>
                </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
