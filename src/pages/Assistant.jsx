import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hello! I'm your EcoTrack AI Assistant. Calculate your carbon footprint on the Dashboard, and I can give you personalized tips to reduce it. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const footprintStr = localStorage.getItem('carbonFootprint');
      const context = footprintStr ? JSON.parse(footprintStr) : null;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMsg,
          context: context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from backend');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', content: data.response }]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 250px)', minHeight: '400px' }}>
      <div style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Bot size={28} color="var(--accent-primary)" />
          EcoTrack Assistant
        </h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
          }}>
            <div style={{ 
              background: msg.role === 'user' ? 'var(--accent-primary)' : 'rgba(15, 23, 42, 0.8)',
              padding: '0.75rem', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} color="var(--accent-primary)" />}
            </div>
            <div style={{
              background: msg.role === 'user' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              maxWidth: '80%',
              border: msg.role === 'user' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--card-border)',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '50%' }}>
              <Bot size={20} color="var(--accent-primary)" />
            </div>
            <div style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <input
          type="text"
          className="input-field"
          style={{ marginBottom: 0 }}
          placeholder="Ask for advice on reducing your footprint..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="btn-primary" disabled={isLoading} style={{ padding: '0.75rem' }}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
