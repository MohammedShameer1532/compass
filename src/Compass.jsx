import React, { useEffect, useState } from "react";
import './App.css';

const Compass = () => {
	const [heading, setHeading] = useState(0);

	useEffect(() => {
		const handleOrientation = (event) => {
			const newHeading = event.alpha; // "alpha" represents the compass direction in degrees
			if (newHeading !== null) {
				setHeading(newHeading);
			}
		};

		// Listen for device orientation events
		window.addEventListener("deviceorientation", handleOrientation);

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
					style={{ transform: rotate(${-heading}deg) }}
				/>
			</div>
			<p className="heading-value">{Heading: ${heading?.toFixed(2) || 0}°}</p>
			<p className="cardinal-direction">{Direction: ${getCardinalDirection()}}</p>
		</div>
	);
};

export default Compass;
