import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

// Using environment variables for sensitive data
const API_URL = process.env.API_URL || 'https://test-function-385323593444.us-central1.run.app';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    // Cache the response for 10 minutes (600 seconds)
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=300');
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching data:', error.message || error);
    res.status(500).json({ error: error.message || 'Failed to fetch data' });
  }
}
