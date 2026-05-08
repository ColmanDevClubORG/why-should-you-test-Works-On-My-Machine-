import { useState } from 'react';
import { Button, Input } from './ui';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!username) {
      setError('Username is required');
    } else {
      setError('');
      alert(`Welcome, ${username}! (This action should be tested)`);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Works On My Machine 🛠️</h1>
        <p className="subtitle">Why should you test? Because "it works for me" isn't enough.</p>
      </header>

      <main className="card">
        <section className="components-grid">
          <div className="component-demo">
            <h2>Button Component</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className="component-demo">
            <h2>Input Component</h2>
            <Input 
              label="Username" 
              placeholder="Enter your name" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={error}
            />
            <Button 
              onClick={handleSubmit} 
              style={{ marginTop: '1rem', width: '100%' }}
            >
              Submit Form
            </Button>
          </div>
        </section>

        <section style={{ marginTop: '3rem', textAlign: 'left', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <h3>The Importance of Testing</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            These UI components look great, but how do we know they behave correctly?
            <br /><br />
            - Does the Button trigger the callback every time?<br />
            - Does the Input show an error message when validation fails?<br />
            - Does the UI handle edge cases?
          </p>
          <p style={{ fontWeight: '600' }}>
            In this project, we'll implement Vitest and Storybook tests to ensure our "basic" components are bulletproof.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
