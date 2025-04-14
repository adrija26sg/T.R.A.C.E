import { useEffect, useRef, useState } from 'react';

interface SensorData {
  A: string;  // Anchor ID
  R: string;  // Range
}

interface WebSocketData {
  links: SensorData[];
}

export function useWebSocket(url: string) {
  const [data, setData] = useState<WebSocketData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    socket.current.onmessage = (event) => {
      try {
        const parsedData: WebSocketData = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.current?.close();
    };
  }, [url]);

  return { data, isConnected };
}
