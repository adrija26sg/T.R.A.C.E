<<<<<<< HEAD
// const WebSocket = require('ws');

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 8080 }, () => {
//   console.log('WebSocket Server running on ws://localhost:8080');
// });

// // Variable to toggle between floor numbers
// let floorNumber = 6;

// // Function to generate random sensor data
// function generateRandomSensorData() {
//   return {
//     floor: floorNumber, // Include the current floor number
//     links: [
//       { A: "1782", R: (Math.random() * 5).toFixed(2) }, // Random value between 0 and 5
//       { A: "1783", R: (Math.random() * 5).toFixed(2) }, // Random value between 0 and 5
//     ],
//   };
// }

// // Periodically update and broadcast sensor data every 15 seconds
// setInterval(() => {
//   const sensorData = generateRandomSensorData();
//   console.log('Broadcasting data:', sensorData);

//   const message = JSON.stringify(sensorData);
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   });
// }, 15000); // Broadcast every 15 seconds

// // Switch floor every 10 seconds
// setInterval(() => {
//   floorNumber = floorNumber === 6 ? 7 : 6; // Toggle between Floor 6 and Floor 7
//   console.log(`Switching to Floor Number: ${floorNumber}`);
// }, 10000); // Switch every 10 seconds

// // Handle new client connections
// wss.on('connection', (ws) => {
//   console.log('New client connected');

//   // Send initial data to the client
//   const initialData = generateRandomSensorData();
//   ws.send(JSON.stringify(initialData));

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });




const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080, host: '0.0.0.0' }, () => {
=======
const WebSocket = require('ws');
const notifier = require('node-notifier');

// Create a WebSocket server
const ws = new WebSocket.Server({ port: 8080, host: '0.0.0.0' }, () => {
>>>>>>> 2d67fd6b28e400dfcd5ab977cbd6e7c0d2b1b747
  console.log('WebSocket Server running on ws://localhost:8080');
});

// Handle new client connections
<<<<<<< HEAD
wss.on('connection', (ws) => {
  console.log('New client connected');  // Log message for new connection

  // Optionally, you can send an initial message to the connected client
  ws.send('Connection established successfully!');

  // Listen for messages sent by the client (sensor data)
  ws.on('message', (message) => {
    console.log('Data received from sensor:', message); // Log the data sent from the sensor
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

wss.on('listening', () => {
  console.log('WebSocket Server is ready to accept connections.');
});

wss.on('error', (err) => {
  console.error('Error occurred:', err);
});

=======
ws.on('connection', (client) => {
  console.log('New client connected');  

  // Listen for messages sent by the client (sensor data from equipment)
  client.on('message', (message) => {
    // Convert Buffer to string if needed
    const messageStr = message.toString();
    console.log('Data received from equipment:', messageStr);

    // Handle "1" message for Unidentified person
    if (messageStr === '1') {
      console.log('Unidentified person detected');

      // Show desktop notification
      notifier.notify({
        title: 'Security Alert',
        message: 'Unidentified person detected!',
        sound: true,  // Enable sound for the notification
        wait: true    // Wait for the user to close the notification before proceeding
      });
    }
  });

  // Optional: Send a welcome message to the client
  client.send('Connected to WebSocket server');
});

ws.on('listening', () => {
  console.log('WebSocket Server is ready to accept connections.');
});

ws.on('error', (err) => {
  console.error('Error occurred:', err);
});


// const WebSocket = require('ws');

// // Create a WebSocket server
// const ws = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });

// // Handle new client connections
// ws.on('connection', (client) => {

//   // Listen for messages sent by the client (sensor data from equipment)
//   client.on('message', (message) => {
//     // Convert Buffer to string if needed and log the received message
//     const messageStr = message.toString();
//     console.log('Data received from equipment:', messageStr);
//   });
// });
>>>>>>> 2d67fd6b28e400dfcd5ab977cbd6e7c0d2b1b747
