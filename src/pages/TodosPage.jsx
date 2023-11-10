import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserManagementModal from '../components/UserManagementModal';
import requireAuth from '../guardToken';
import { Link } from 'react-router-dom';


function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoDescription, setTodoDescription] = useState('');
  const [showUserManagement, setShowUserManagement] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Funktion för att hämta todos från din backend
  const fetchTodos = useCallback(() => {
    if (!token) {
      console.error('Token är inte tillgänglig.');
      return;
    }

    fetch('http://localhost:3001/api/todos/', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setTodos(data);
    })
    .catch((error) => {
      console.error('Det gick inte att hämta todos:', error);
    });
  }, [token] );

  // Anropa fetchTodos när komponenten har monterats och när token ändras
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); 


  // Funktion för att lägga till en ny todo
  const addTodo = () => {
    if (todoDescription) {
      if (user && user.role === 'admin'){
      fetch('http://localhost:3001/api/todos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ description: todoDescription }),
      })
        .then(() => {
          setTodoDescription('');
          fetchTodos();
        })
        .catch((error) => console.error(error));
    }}
  };

    // Funktion för att ta bort en todo
    const deleteTodo = (todoId) => {
      fetch(`http://localhost:3001/api/todos/${todoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(() => {
          fetchTodos();
        })
        .catch((error) => console.error(error));
    };


  const logout = () => {
    if (token) {
      fetch('http://localhost:3001/api/users/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      .then(response => {
        if (response.ok) {
          console.log('Utloggad från backend');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Det gick inte att logga ut från backend:', error);
      })
      .finally(() => {
        // Rensa token och användaruppgifter från localStorage oavsett svar från server
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Omdirigera till login-sidan eller gör något annat efter utloggning
        window.location.href = 'http://localhost:3000/';
      });
    } else {
      console.error('Ingen token finns för att logga ut');
    }
  };
  

  return (
    <div className="container mt-5">
      <h1>Todo App</h1>
      <a href="http://localhost:3000/" className="btn btn-primary" onClick={logout}>
        Logga ut
      </a>
      {user.role === 'admin' && (
        <button onClick={() => setShowUserManagement(true)} className="btn btn-secondary">
          Hantera användarroller
        </button>
      )}
      {showUserManagement && (
        <UserManagementModal
          onClose={() => setShowUserManagement(false)}
          adminToken={token}
        />
      )}
       
       {user.role === 'admin' && 
      <Link to="/invatefriend">Bjud in en vän</Link>
        }
        <div>
          <p>Användare: {user.username}</p>
          <p>Roll: {user.role}</p>
        </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          placeholder="Skriv din todo här"
        />
        <div className="input-group-append">
          <button onClick={addTodo} className="btn btn-success">
            Lägg till
          </button>
        </div>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item d-flex justify-content-between" key={todo.id}>
            <div>
              <input type="checkbox" checked={todo.completed} className="mr-3" onChange={() => deleteTodo(todo.id)} />
              <span style={{ marginLeft: '10px' }}>{todo.description}</span>
            </div>
          </li>
        ))}
      </ul>
      
     
    </div>
  );
}

export default requireAuth(TodoApp);


