import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// Initialisation de Sentry
Sentry.init({
  dsn: "https://10ccd191a3295803134853079761bdcb@o4506240525598720.ingest.sentry.io/4506713417711616",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (email !== 'test@example.com' || password !== 'password') {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      Sentry.captureException(error);
      setError('An error occurred during login. Please try again.');
    }
  };

  const throwError = () => {
    try {
      // Simulating a new error
      throw new Error('This is a new error for Sentry');
    } catch (error) {
      Sentry.captureException(error); // Send this error to Sentry
      setError('A new error has been thrown and sent to Sentry.');
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
        <button type="button" onClick={throwError}>Throw Error</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Sentry.withProfiler(LoginForm); // Integrates Sentry performance monitoring
