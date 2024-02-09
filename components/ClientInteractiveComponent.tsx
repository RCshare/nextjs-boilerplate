import React from 'react';

export default function ClientInteractiveComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
    // Handle the click event
  };

  return (
    <button onClick={handleClick}>Click Me</button>
  );
}