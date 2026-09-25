import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Solutions from './pages/Solutions';
import Services from './pages/Services';

export default function App() {
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
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Services
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Solutions />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Shake &amp; Stir Consulting. Crafted with care.</p>
      </footer>
    </div>
  );
}
