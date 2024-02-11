import React from 'react';
import * as Sentry from "@sentry/react";

export default function ClientInteractiveComponent() {
      
    const handleClick = () => {
        try {
            // This function should be defined elsewhere and is expected to possibly throw an error.
			throw new Error("error");
        } catch (err) {
            Sentry.captureException(err);
        }
        console.log('Button clicked!');
        // Handle the click event
    };

    return (
        <button type="button" onClick={handleClick}>
            Break the world
        </button>
    );
}



