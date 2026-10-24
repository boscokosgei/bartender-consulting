import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import Upselling from './pages/Upselling';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">🍸</span>
            <span className="logo-text">Shake &amp; Stir</span>
          </div>
          <nav className="nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Solutions
            </NavLink>
            <NavLink to="/upselling" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Upselling
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Services
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Admin
              </NavLink>
            )}
            {user ? (
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout ({user.name})
              </button>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Solutions />} />
          <Route path="/upselling" element={<Upselling />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Shake &amp; Stir Consulting. Crafted with care.</p>
      </footer>
    </div>
  );
}
