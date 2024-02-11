import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// Initialisation de Sentry
Sentry.init({
  dsn: "https://10ccd191a3295803134853079761bdcb@o4506240525598720.ingest.sentry.io/4506713417711616",
  integrations: [
    new Integrations.BrowserTracing(), // Correct integration setup
    // Replay Integration is not directly available as shown in your initial code. If you're looking to use Sentry's session replay feature, you'll need to ensure you're using the correct SDK and feature set. Sentry's Session Replay might require additional setup or a different approach.
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions
  // Define which URLs distributed tracing should be enabled for
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // Sample rate at 10%. Adjust based on environment and needs.
  replaysOnErrorSampleRate: 1.0, // 100% sample rate for sessions with errors.
});

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Simulate login process, replace with actual login logic
      if (email !== 'test@example.com' || password !== 'password') {
        throw new Error('Invalid credentials');
      }
      // If login is successful, proceed with the application flow
    } catch (error) {
      Sentry.captureException(error); // Log error to Sentry
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Sentry.withProfiler(LoginForm); // Integrates Sentry performance monitoring
