// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// const API_URL = process.env.API_URL || 'https://test-function-385323593444.us-central1.run.app';

// export default async function handler(
//   req: NextApiRequest, 
//   res: NextApiResponse
// ) {
//   try {
//     const response = await axios.get(API_URL);
//     const data = response.data;

//     // Extract relevant data
//     const updatedSoldierData = {
//       newFloorNumber: data.Location,
//       newStatus: data.Healt,
//     };

//     res.status(200).json(updatedSoldierData);
//   } catch (error: any) {
//     console.error('Error fetching data:', error.message || error);
//     res.status(500).json({ error: error.message || 'Failed to fetch data' });
//   }
// }




import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const useUpdatedSoldierData = () => {
  const { data, error } = useSWR('https://test-function-385323593444.us-central1.run.app', fetcher, {
    refreshInterval: 100,  
  });

  return {
    updatedSoldierData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
