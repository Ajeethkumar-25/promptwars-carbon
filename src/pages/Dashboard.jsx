import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Car, Zap, Utensils, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [footprint, setFootprint] = useState(null);

  useEffect(() => {
    const fetchFootprint = async () => {
      try {
        const response = await fetch('/api/footprint');
        if (response.ok) {
          const result = await response.json();
          if (result.data) {
            setFootprint(result.data);
            localStorage.setItem('carbonFootprint', JSON.stringify(result.data));
            return;
          }
        }
      } catch (e) {
        console.error("Failed to fetch footprint from backend", e);
      }
      
      const stored = localStorage.getItem('carbonFootprint');
      if (stored) {
        setFootprint(JSON.parse(stored));
      }
    };
    
    fetchFootprint();
  }, []);

  if (!footprint) {
    return (
      <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <Leaf size={64} color="var(--accent-primary)" style={{ margin: '0 auto 1.5rem' }} />
        <h2>Welcome to EcoTrack</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Start your journey towards a greener lifestyle. Calculate your current carbon footprint to get personalized insights and actionable reduction tips.
        </p>
        <Link to="/calculate" className="btn-primary">
          Calculate My Footprint <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Carbon Footprint</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Based on your daily habits</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-primary)', lineHeight: '1' }}>
            {footprint.total.toFixed(1)}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>kg CO₂e / day</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#60a5fa' }}>
            <Car size={24} />
            <h3 style={{ margin: 0 }}>Transport</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{footprint.transport.toFixed(1)} kg</div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#facc15' }}>
            <Zap size={24} />
            <h3 style={{ margin: 0 }}>Energy</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{footprint.energy.toFixed(1)} kg</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#fb923c' }}>
            <Utensils size={24} />
            <h3 style={{ margin: 0 }}>Food</h3>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{footprint.food.toFixed(1)} kg</div>
        </div>
      </div>

      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>Want to reduce your impact?</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Chat with our AI assistant to get personalized, actionable advice based on your current habits.
        </p>
        <Link to="/assistant" className="btn-primary">
          Get Personalized Tips <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
