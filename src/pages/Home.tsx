import { useState, useMemo } from 'react';
import { Button, Input } from '../ui';
import { validationService } from '../services/validationService';
import { apiService } from '../services/apiService';

export const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { validateEmail, validatePassword, isUsernameTaken } = useMemo(() => validationService(), []);
  const { registerUser, logAnalytics } = useMemo(() => apiService(), []);

  const handleSubmit = async () => {
    logAnalytics('submit_clicked', { username });
    const newErrors: Record<string, string> = {};

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (isUsernameTaken(username)) {
      newErrors.username = 'This username is already taken';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be 8+ chars with at least one number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      const result = await registerUser({ username, email, password });
      setIsLoading(false);
      
      if (result.success) {
        alert(`Success! User ${username} registered with ID: ${result.id}`);
      }
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
            <h2>Registration Form</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Try: "admin" as username, "invalid-email", or "123" as password.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              <Input 
                label="Username" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
              />
              <Input 
                label="Email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <Input 
                label="Password" 
                type="password"
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              <Button 
                onClick={handleSubmit} 
                style={{ marginTop: '0.5rem', width: '100%' }}
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Create Account'}
              </Button>
            </div>
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
};
