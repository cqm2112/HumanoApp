import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Weather from './pages/Weather';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
