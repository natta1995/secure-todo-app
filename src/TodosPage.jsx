import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoDescription, setTodoDescription] = useState('');

  // Funktion för att hämta todos från din backend
  const fetchTodos = () => {
    // Använd fetch för att göra GET-förfrågan till din API-endpunkt
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
      // Använd fetch för att göra POST-förfrågan till din API-endpunkt
      fetch('http://localhost:3001/api/todos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: todoDescription }),
      })
        .then(() => {
          setTodoDescription('');
          fetchTodos();
        })
        .catch((error) => console.error(error));
    }
  };

  // Rendera din lista av todos
  const todoItems = todos.map((todo) => (
    <div key={todo.id}>
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.description}</span>
    </div>
  ));

  const logout = () => {
    // Rensa token från localStorage (eller sessionStorage om du använder det)
    localStorage.removeItem('token');
    // Lägg till kod för att rensa eventuell användarinformation här
    // Efter att du har rensat tokenen kan du omdirigera användaren till inloggningssidan
    //window.location.href = '/http://localhost:3000/'; // Byt ut '/login' med den faktiska URL till din inloggningssida
  };

  return (
    <div>
      <h1>Todo App</h1>
      
      <a href="http://localhost:3000/"
        onClick={() => {logout();}}>
        Logga ut</a>
      <div>
        <input
          type="text"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          placeholder="Skriv din todo här"
        />
        <button onClick={addTodo}>Lägg till</button>
      </div>
      <div>{todoItems}</div>
    </div>
  );
}

export default TodoApp;

