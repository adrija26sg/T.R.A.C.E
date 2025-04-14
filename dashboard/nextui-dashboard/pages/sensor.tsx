// import { useWebSocket } from '../components/hooks/useWebSocket';

// const SensorPage: React.FC = () => {
//   const { data, isConnected } = useWebSocket('ws://localhost:8080');

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Sensor Data</h1>
//       <p>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>

//       {data ? (
//         <>
//           <h2>Floor Number: {data.floor}</h2> {/* Display only the Floor Number */}
//         </>
//       ) : (
//         <p>Waiting for sensor data...</p>
//       )}
//     </div>
//   );
// };

// export default SensorPage;



import { useWebSocket } from '../components/hooks/useWebSocket';

const SensorPage: React.FC = () => {
  const { data, isConnected } = useWebSocket('ws://localhost:8080');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sensor Data</h1>
      <p>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>

      {data ? (
        <>
          <h2>Floor Number: {data.floor}</h2> {/* Display only the Floor Number */}
          
          {/* Display the entire data object */}
          <h3>Full Sensor Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Format the data as JSON for better readability */}
        </>
      ) : (
        <p>Waiting for sensor data...</p>
      )}
    </div>
  );
};

export default SensorPage;
