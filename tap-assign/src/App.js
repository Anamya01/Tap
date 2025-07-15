import React, { useEffect, useState } from 'react';
import NewsFeed from './Components/NewsFeed';
import NetworkWarning from './Components/NetworkWarning';
import StatusPanel from './Components/StatusPanel';
import useNetworkMonitor from './useNetworkMonitor';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLiteMode, setIsLiteMode] = useState(false);

  const networkInfo = useNetworkMonitor(); // custom hook using setInterval()
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });

        try {
          const response = await fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setLocation(data.address?.city || data.address?.state || 'your location');
        } catch (error) {
          console.error("Failed to get location info", error);
        }
      });
    }
  }, []);

  // Weather
  useEffect(() => {
    const fetchWeather = async () => {
      if (coords) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`
          );
          const data = await res.json();
          setWeather({
            temp: Math.round(data.main.temp),
            desc: data.weather[0].main,
          });
        } catch (e) {
          console.error('Weather fetch failed', e);
        }
      }
    };
    fetchWeather();
  }, [coords]);

  // Lite mode detection
  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn?.effectiveType === '2g' || conn?.effectiveType === '3g' || conn?.downlink < 0.5) {
      setIsLiteMode(true);
    }
  }, []);

  return (
    <div className="App">
      <StatusPanel location={location} weather={weather} networkInfo={networkInfo} />
      <NetworkWarning isLiteMode={isLiteMode} />
      <NewsFeed isLiteMode={isLiteMode} location={location} />
    </div>
  );
}

export default App;
