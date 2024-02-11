import React from 'react';

export default function ClientInteractiveComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
    // Handle the click event
  };

  return (
    <button
  type="button"
  onClick={() => {
    throw new Error("Sentry Test Error");
  }}
>
  Break the world
</button>

  );
}

