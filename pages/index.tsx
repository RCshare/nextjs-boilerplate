// pages/index.jsx or pages/index.tsx
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import a component with client-side interactivity
const ClientInteractiveComponent = dynamic(
  () => import('../components/ClientInteractiveComponent'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <h1>Welcome to Next.js</h1>
      {/* Use your client-side interactive component here */}
      <ClientInteractiveComponent />
    </>
  );
}