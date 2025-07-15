import React from 'react';
import './NetworkWarning.css';

const NetworkWarning = ({ isLiteMode }) => {
  return (
    isLiteMode && (
      <div className="network-warning">
        ⚠️ Slow network detected. Switched to Lite Mode.
      </div>
    )
  );
};

export default NetworkWarning;
