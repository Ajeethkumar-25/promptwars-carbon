import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Leaf, LayoutDashboard, Calculator, MessageSquare } from 'lucide-react';
import './App.css';

// We'll create these components next
import Dashboard from './pages/Dashboard';
import FootprintCalculator from './pages/FootprintCalculator';
import Assistant from './pages/Assistant';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header animate-fade-in">
          <Link to="/" className="logo">
            <Leaf size={32} />
            <span>EcoTrack</span>
          </Link>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
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
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calculate" element={<FootprintCalculator />} />
            <Route path="/assistant" element={<Assistant />} />
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
