// gcvClient.js
const { VisionClient } = require('@google-cloud/vision');

const gcvClient = new VisionClient({
  keyFilename: 'https://test-function-385323593444.us-central1.run.app',
});

module.exports = gcvClient;