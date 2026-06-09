import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Leaf, LayoutDashboard, Calculator, MessageSquare, LogOut } from 'lucide-react';
import './App.css';

import Dashboard from './pages/Dashboard';
import FootprintCalculator from './pages/FootprintCalculator';
import Assistant from './pages/Assistant';
import Login from './pages/Login';
import Breadcrumbs from './components/Breadcrumbs';

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = (name) => {
    localStorage.setItem('username', name);
    setUsername(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <header className="header animate-fade-in">
          <Link to="/" className="logo">
            <Leaf size={32} />
            <span>EcoTrack</span>
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/calculate" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <Calculator size={20} />
              <span>Calculator</span>
            </Link>
            <Link to="/assistant" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <MessageSquare size={20} />
              <span>AI Assistant</span>
            </Link>
            
            <div style={{ width: '1px', height: '24px', background: 'var(--card-border)', margin: '0 0.5rem' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Hi, <strong>{username}</strong></span>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LogOut size={14} /> Switch
              </button>
            </div>
          </nav>
        </header>

        <main className="main-content">
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Dashboard username={username} />} />
            <Route path="/calculate" element={<FootprintCalculator username={username} />} />
            <Route path="/assistant" element={<Assistant username={username} />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} EcoTrack. PromptWars Virtual Main Challenge 3.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
