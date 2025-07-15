import { useEffect, useState } from 'react';

export default function useNetworkMonitor(intervalMs = 30000) {
  const [networkInfo, setNetworkInfo] = useState({
    effectiveType: '',
    downlink: '',
    type: ''
  });

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const updateNetwork = () => {
      if (connection) {
        setNetworkInfo({
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          type: connection.type
        });
      }
    };

    updateNetwork(); // first update on mount
    const intervalId = setInterval(updateNetwork, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs]);

  return networkInfo;
}
