import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel" 
        style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}
      >
        <Leaf size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Welcome to EcoTrack</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Please enter your name to start tracking your footprint.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              className="input-field" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Continue <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
