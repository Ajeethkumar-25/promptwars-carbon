import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

/**
 * Assistant Component
 * 
 * Provides an interactive AI chat interface for users to receive personalized 
 * carbon footprint reduction advice.
 * 
 * @component
 */
export default function Assistant({ username }) {
  const [messages, setMessages] = useState([
    { role: 'model', content: `Hello ${username || ''}! I'm your EcoTrack AI Assistant. Calculate your carbon footprint on the Dashboard, and I can give you personalized tips to reduce it. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const footprintStr = localStorage.getItem(`carbonFootprint_${username}`);
      const context = footprintStr ? JSON.parse(footprintStr) : null;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context })
      });

      if (!res.ok) throw new Error("Failed to fetch from backend");
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'model', content: data.response }]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel" 
      style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 250px)', minHeight: '400px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)' }}>
        <Bot size={32} color="var(--accent-primary)" />
        <h2>EcoTrack AI</h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem', paddingRight: '1rem' }}>
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={idx} 
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'flex-start',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
            }}
          >
            <div style={{ 
              padding: '0.5rem', 
              borderRadius: '50%', 
              background: msg.role === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {msg.role === 'user' ? <User size={20} color="white" /> : <Bot size={20} color="var(--accent-primary)" />}
            </div>
            
            <div style={{ 
              background: msg.role === 'user' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              padding: '1rem',
              borderRadius: '12px',
              borderTopRightRadius: msg.role === 'user' ? '4px' : '12px',
              borderTopLeftRadius: msg.role === 'model' ? '4px' : '12px',
              border: '1px solid var(--card-border)',
              maxWidth: '80%',
              lineHeight: '1.6'
            }}>
              {msg.role === 'model' ? (
                <div className="markdown-body">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex' }}>
              <Bot size={20} color="var(--accent-primary)" />
            </div>
            <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', borderTopLeftRadius: '4px', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>●</motion.span>
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>●</motion.span>
              <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>●</motion.span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
        <input 
          type="text" 
          className="input-field"
          style={{ marginBottom: 0 }}
          placeholder="Ask for advice on reducing your footprint..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          maxLength={1000}
          aria-label="Message input"
        />
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isLoading || !input.trim()} 
          style={{ padding: '0.75rem' }}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
    </motion.div>
  );
}
