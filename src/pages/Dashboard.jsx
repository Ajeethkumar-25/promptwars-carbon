import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Car, Zap, Utensils, ArrowRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Dashboard Component
 * 
 * Displays the user's current carbon footprint breakdown with interactive charts
 * and provides a dynamic grading system.
 * 
 * @component
 */
export default function Dashboard() {
  const [footprint, setFootprint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFootprint = async () => {
      try {
        const res = await fetch('/api/footprint');
        if (res.ok) {
          const result = await res.json();
          setFootprint(result.data);
        }
      } catch (e) {
        console.error("Failed to fetch footprint", e);
      } finally {
        setLoading(false);
      }
    };
    fetchFootprint();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading insights...</div>;
  }

  if (!footprint) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}
      >
        <Leaf size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
        <h2>Welcome to EcoTrack</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          It looks like you haven't calculated your footprint yet. Let's get started!
        </p>
        <Link to="/calculate" className="btn-primary">
          Calculate Footprint <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  // Formatting for Recharts
  const chartData = [
    { name: 'Transport', value: footprint.transport, color: '#3b82f6' }, // Blue
    { name: 'Energy', value: footprint.energy, color: '#f59e0b' },    // Yellow
    { name: 'Food', value: footprint.food, color: '#10b981' },        // Emerald
  ];

  // Grading Logic
  const getGrade = (total) => {
    if (total < 10) return { grade: 'A+', color: '#10b981', text: 'Excellent! You are a climate champion.' };
    if (total < 20) return { grade: 'B', color: '#3b82f6', text: 'Good! You are below average.' };
    if (total < 30) return { grade: 'C', color: '#f59e0b', text: 'Average. There is room for improvement.' };
    return { grade: 'D', color: '#ef4444', text: 'High impact. Let the AI Assistant help you reduce this!' };
  };
  const gradeInfo = getGrade(footprint.total);

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      style={{ maxWidth: '900px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Your Environmental Impact</h2>
        <Link to="/calculate" className="btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
          Recalculate
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Total Score Card */}
        <motion.div variants={itemVars} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Daily Footprint</h3>
          <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-primary)', lineHeight: 1 }}>
            {footprint.total.toFixed(1)}
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>kg CO₂e</span>
        </motion.div>

        {/* Grade Card */}
        <motion.div variants={itemVars} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>Eco Grade</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={32} color={gradeInfo.color} />
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: gradeInfo.color, lineHeight: 1 }}>
              {gradeInfo.grade}
            </div>
          </div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{gradeInfo.text}</span>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        
        {/* Breakdown List */}
        <motion.div variants={itemVars} className="glass-panel">
          <h3 style={{ marginBottom: '1.5rem' }}>Breakdown</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: Car, label: 'Transport', value: footprint.transport, color: '#3b82f6' },
              { icon: Zap, label: 'Energy', value: footprint.energy, color: '#f59e0b' },
              { icon: Utensils, label: 'Food', value: footprint.food, color: '#10b981' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.5rem', background: `${item.color}20`, borderRadius: '8px' }}>
                    <item.icon size={20} color={item.color} />
                  </div>
                  <span style={{ fontWeight: '500' }}>{item.label}</span>
                </div>
                <div style={{ fontWeight: '600' }}>{item.value.toFixed(1)} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '400' }}>kg</span></div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recharts Pie Chart */}
        <motion.div variants={itemVars} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem' }}>Distribution</h3>
          <div style={{ flex: 1, minHeight: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`${value.toFixed(1)} kg`, 'CO₂e']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

      <motion.div variants={itemVars} style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link to="/assistant" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          <Leaf size={20} /> Get Personalized Tips from AI
        </Link>
      </motion.div>

    </motion.div>
  );
}
