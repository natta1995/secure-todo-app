import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './pages/LogInPage';
import Register from './pages/RegisterPage'
import TodoList from './pages/TodosPage'
import ForgottenPassword from './forgottPassword'
import NewPassword from './newPassword';
import RegisterUser from './RegisterUser';
//import requireAuth from './guardToken';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<ForgottenPassword />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/newpassword" element={<NewPassword />} />
        <Route path="/registeruser" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



