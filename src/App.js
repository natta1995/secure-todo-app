import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './pages/LogInPage';
import Register from './pages/RegisterPage'
import TodoList from './pages/TodosPage'
import ForgottenPassword from './pages/ForgottPasswordPage'
import NewPassword from './newPassword';
import RegisterUser from './pages/RegisterUserInvatePage';
import InviteUser from './components/InvateUsers';

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
        <Route path="/invatefriend" element={<InviteUser />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



