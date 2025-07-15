import React from 'react';
import './StatusPanel.css';

const StatusPanel = ({ location, weather, networkInfo }) => {
  return (
    <div className="status-panel">
      <div>📍 {location || 'Detecting...'}</div>
      <div>🌤️ {weather ? `${weather.temp}°C ${weather.desc}` : 'Loading weather...'}</div>
      <div>🌐 {networkInfo.effectiveType?.toUpperCase()} ({networkInfo.downlink} Mbps)</div>
    </div>
  );
};

export default StatusPanel;
