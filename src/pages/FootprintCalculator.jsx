import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Car, Plane, Zap, Utensils, Leaf, Beef } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * FootprintCalculator Component
 * 
 * Collects user habits via tactile range sliders and interactive cards
 * to calculate their estimated daily carbon footprint.
 * 
 * @component
 */
export default function FootprintCalculator({ username }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carMiles: 15,
    flightHours: 5,
    electricityKwh: 20,
    dietType: 'average'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const calculateFootprint = async (e) => {
    e.preventDefault();
    
    let transportCO2 = (formData.carMiles * 0.4) + (formData.flightHours * 90) / 30;
    let energyCO2 = formData.electricityKwh * 0.38;
    
    let foodCO2 = 0;
    switch(formData.dietType) {
      case 'vegan': foodCO2 = 2.9; break;
      case 'vegetarian': foodCO2 = 3.8; break;
      case 'average': foodCO2 = 5.6; break;
      case 'meat-heavy': foodCO2 = 7.2; break;
      default: foodCO2 = 5.6;
    }

    const result = {
      transport: transportCO2,
      energy: energyCO2,
      food: foodCO2,
      total: transportCO2 + energyCO2 + foodCO2,
      rawInputs: formData
    };

    localStorage.setItem(`carbonFootprint_${username}`, JSON.stringify(result));
    
    try {
      await fetch(`/api/footprint?user_id=${encodeURIComponent(username)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transport: transportCO2,
          energy: energyCO2,
          food: foodCO2,
          total: transportCO2 + energyCO2 + foodCO2
        })
      });
    } catch (e) {
      console.error("Failed to save footprint to backend", e);
    }

    navigate('/');
  };

  // Diet options
  const dietOptions = [
    { id: 'vegan', label: 'Vegan', desc: 'No animal products', icon: Leaf },
    { id: 'vegetarian', label: 'Vegetarian', desc: 'No meat', icon: Utensils },
    { id: 'average', label: 'Average', desc: 'Some meat', icon: Zap },
    { id: 'meat-heavy', label: 'Meat-Heavy', desc: 'Lots of meat', icon: Beef }
  ];

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
      className="glass-panel" 
      style={{ maxWidth: '650px', margin: '0 auto' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Calculator size={32} color="var(--accent-primary)" />
        <h2>Calculate Your Footprint</h2>
      </div>

      <form onSubmit={calculateFootprint} role="form">
        
        {/* Car Travel Slider */}
        <motion.div variants={itemVars} className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label htmlFor="carMiles" className="input-label" style={{ marginBottom: 0 }}>
              <Car size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }}/> 
              Daily car travel
            </label>
            <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{formData.carMiles} miles</span>
          </div>
          <input 
            id="carMiles"
            type="range" 
            name="carMiles" 
            min="0" 
            max="100"
            value={formData.carMiles} 
            onChange={handleChange} 
            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            aria-label="Daily car travel"
          />
        </motion.div>

        {/* Flight Slider */}
        <motion.div variants={itemVars} className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label htmlFor="flightHours" className="input-label" style={{ marginBottom: 0 }}>
              <Plane size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }}/> 
              Yearly flight travel
            </label>
            <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{formData.flightHours} hours</span>
          </div>
          <input 
            id="flightHours"
            type="range" 
            name="flightHours" 
            min="0" 
            max="100"
            value={formData.flightHours} 
            onChange={handleChange} 
            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            aria-label="Yearly flight travel"
          />
        </motion.div>

        {/* Electricity Slider */}
        <motion.div variants={itemVars} className="input-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label htmlFor="electricityKwh" className="input-label" style={{ marginBottom: 0 }}>
              <Zap size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }}/> 
              Daily home electricity usage
            </label>
            <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{formData.electricityKwh} kWh</span>
          </div>
          <input 
            id="electricityKwh"
            type="range" 
            name="electricityKwh" 
            min="0" 
            max="100"
            value={formData.electricityKwh} 
            onChange={handleChange} 
            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            aria-label="Daily home electricity usage"
          />
        </motion.div>

        {/* Diet Grid */}
        <motion.div variants={itemVars} className="input-group" style={{ marginTop: '2rem' }}>
          <label className="input-label" style={{ marginBottom: '1rem' }}>
            <Utensils size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }}/> 
            Diet Type
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }} role="group" aria-label="Diet Type">
            {dietOptions.map(option => (
              <div 
                key={option.id}
                onClick={() => setFormData(prev => ({ ...prev, dietType: option.id }))}
                role="button"
                aria-label={`Select ${option.label} diet`}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFormData(prev => ({ ...prev, dietType: option.id })) }}
                style={{
                  padding: '1rem',
                  border: `2px solid ${formData.dietType === option.id ? 'var(--accent-primary)' : 'var(--card-border)'}`,
                  borderRadius: '12px',
                  background: formData.dietType === option.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.4)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', color: formData.dietType === option.id ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                  {option.label}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{option.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button 
          variants={itemVars}
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.1rem' }}
        >
          Calculate My Impact
        </motion.button>
      </form>
    </motion.div>
  );
}
