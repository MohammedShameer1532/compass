import React, { useState, useEffect } from "react";
import "./App.css"; // CSS for compass styling

const Compass = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    // Function to handle device orientation change
    const handleOrientation = (event) => {
      const { alpha } = event; // Get the z-axis rotation in degrees
      setAngle(alpha); // Set the angle for rotating the compass
    };

    // Add event listener for device orientation
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    } else {
      alert("Device orientation not supported on this device.");
    }

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <div className="compass-container">
      <div className="compass" style={{ transform: `rotate(${angle}deg)` }}>
        {/* Compass circle */}
        <div className="compass-circle">
          <div className="north-marker">↑ North</div>
        </div>
      </div>
    </div>
  );
};

export default Compass;
