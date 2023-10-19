import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';

function TodoList() {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    // Hämta användaruppgifter från lokal lagring (om de finns)
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', user: JSON.parse(user) });
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Todo List</h2>
      <p>Inloggad som: {state.user ? state.user.username : 'Ingen användare inloggad'}</p>
      {/* Dina todo-list-komponenter här */}
    </div>
  );
}

export default TodoList;







/*import React from 'react';
import { useAuth } from './AuthContext';

function TodoList() {
  const { state } = useAuth();
  console.log(state)

  return (
    <div>
      <h2>Todo List</h2>
      <p>Inloggad som: {state.user ? state.user.username : 'Ingen användare inloggad'}</p>
      
    </div>
  );
}

export default TodoList;*/





/*import React from 'react';
import { useParams } from 'react-router-dom';

function Todo() {
  const { username } = useParams(); // Hämta användarnamnet från URL

  return (
    <div>
      <h2>Todo List</h2>
      <p>Inloggad som: {username}</p> {/* Visa användarnamnet *//*
      
    </div>
  );
}

export default Todo;*/












/*import React from 'react';


function TodoList() {


  return (
    <div>
      <h2>Todo List</h2>
      
    </div>
  );
}

export default TodoList*/