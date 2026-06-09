import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export default function FootprintCalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carMiles: 0,
    flightHours: 0,
    electricityKwh: 0,
    dietType: 'average'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'dietType' ? value : Number(value)
    }));
  };

  const calculateFootprint = async (e) => {
    e.preventDefault();
    
    // Simple calculation metrics (roughly estimated for demonstration)
    // 0.4 kg CO2 per mile driven
    // 90 kg CO2 per hour of flight
    // 0.38 kg CO2 per kWh of electricity
    
    let transportCO2 = (formData.carMiles * 0.4) + (formData.flightHours * 90) / 30; // daily average for flights
    let energyCO2 = formData.electricityKwh * 0.38;
    
    // Diet types daily impact in kg
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

    localStorage.setItem('carbonFootprint', JSON.stringify(result));
    
    try {
      await fetch('/api/footprint', {
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

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Calculator size={32} color="var(--accent-primary)" />
        <h2>Calculate Your Footprint</h2>
      </div>

      <form onSubmit={calculateFootprint}>
        <div className="input-group">
          <label className="input-label">Daily car travel (miles)</label>
          <input 
            type="number" 
            name="carMiles" 
            className="input-field" 
            min="0" 
            value={formData.carMiles} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Yearly flight travel (hours)</label>
          <input 
            type="number" 
            name="flightHours" 
            className="input-field" 
            min="0" 
            value={formData.flightHours} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Daily home electricity usage (kWh)</label>
          <input 
            type="number" 
            name="electricityKwh" 
            className="input-field" 
            min="0" 
            value={formData.electricityKwh} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label className="input-label">Diet Type</label>
          <select 
            name="dietType" 
            className="input-field" 
            value={formData.dietType} 
            onChange={handleChange}
          >
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="average">Average (Some meat)</option>
            <option value="meat-heavy">Meat Heavy</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Calculate My Impact
        </button>
      </form>
    </div>
  );
}
