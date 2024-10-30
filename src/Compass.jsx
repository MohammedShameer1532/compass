import React, { useEffect, useState } from "react";
import './App.css';

const Compass = () => {
    const [heading, setHeading] = useState(0);

    useEffect(() => {
        const isIos = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        const handleOrientation = (event) => {
            let alpha;

            if (isIos() && event.webkitCompassHeading !== undefined) {
                // iOS specific handling
                alpha = event.webkitCompassHeading;
                if (alpha < 0) alpha += 360;
                if (alpha > 360) alpha -= 360;
            } else if ('ondeviceorientationabsolute' in window && event.alpha !== null) {
                // Chrome 50+ specific handling
                alpha = 360 - event.alpha;
                if (alpha < 0) alpha += 360;
                if (alpha > 360) alpha -= 360;
            } else {
                // Fallback for other devices
                alpha = 180 - event.alpha;
                if (alpha < 0) alpha += 360;
                if (alpha > 360) alpha -= 360;
            }

            if (alpha !== null) {
                setHeading(alpha);
            }
        };

        // Add the event listener
        window.addEventListener("deviceorientation", handleOrientation);

        // Clean up
        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    const getCardinalDirection = () => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(heading / 45) % 8;
        return directions[index];
    };

    return (
        <div className="container">
            <h1 className="app-name">Beautiful Compass App</h1>
            <div className="compass-container">
                <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20240122153821/compass.png"
                    alt="Compass"
                    className="compass-image"
                    style={{ transform: `rotate(${-heading}deg)` }}
                />
            </div>
            <p className="heading-value">{`Heading: ${heading?.toFixed(2) || 0}°`}</p>
            <p className="cardinal-direction">{`Direction: ${getCardinalDirection()}`}</p>
        </div>
    );
};

export default Compass;
