import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from '../components/UserList'
import InvateUsers from '../InvateUsers';


function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoDescription, setTodoDescription] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Funktion för att hämta todos från din backend
  const fetchTodos = () => {
    fetch('http://localhost:3001/api/todos/')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  };

  // Anropa fetchTodos när komponenten har monterats
  useEffect(() => {
    fetchTodos();
  }, []);

  // Funktion för att lägga till en ny todo
  const addTodo = () => {
    if (todoDescription) {
      if (user && user.role === 'admin'){
      // Använd fetch för att göra POST-förfrågan till din API-endpunkt
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
    localStorage.removeItem('token');
  };

  return (
    <div className="container mt-5">
      <h1>Todo App</h1>
      <a href="http://localhost:3000/" className="btn btn-primary" onClick={logout}>
        Logga ut
      </a>
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
      {user.role === 'admin' && <UserList adminToken={token} />}
      {user.role === 'admin' && <InvateUsers />}
    </div>
  );
}

export default TodoApp;



