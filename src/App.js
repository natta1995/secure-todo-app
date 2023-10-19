import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './LogInPage';
import Register from './RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



