import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './LogInPage';
import Register from './RegisterPage'
import TodoList from './TodosPage'
import ForgottenPassword from './forgottPassword'

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<ForgottenPassword />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



