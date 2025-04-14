// import React, { useState, useEffect } from 'react';
// import { Text, Link } from '@nextui-org/react';
// import { Box } from '../styles/box';
// import dynamic from 'next/dynamic';
// import { Flex } from '../styles/flex';
// import { CardTransactions } from './list_up';

// const Chart = dynamic(
//    () => import('./Building_model').then((mod) => mod.Steam),
//    {
//       ssr: false,
//    }
// );

// export const Content = () => {
//    // State to store the fetched data
//    const [data, setData] = useState<any>(null);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState<string | null>(null);

//    // Fetch data on component mount
//    useEffect(() => {
//       const fetchData = async () => {
//          try {
//             const response = await fetch('/api/gcv');
//             if (!response.ok) {
//                throw new Error('Failed to fetch data');
//             }
//             const result = await response.json();
//             setData(result);
//             setLoading(false);
//          } catch (err) {
//             setError(err instanceof Error ? err.message : 'An unknown error occurred');
//             setLoading(false);
//          }
//       };

//       fetchData();
//    }, []);

//    // Render loading state
//    if (loading) {
//       return (
//          <Box css={{overflow: 'hidden', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//             <Text>Loading...</Text>
//          </Box>
//       );
//    }

//    // Render error state
//    if (error) {
//       return (
//          <Box css={{overflow: 'hidden', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//             <Text color="error">{error}</Text>
//          </Box>
//       );
//    }

//    return (
//       <Box css={{overflow: 'hidden', height: '100%'}}>
//          <Flex
//             css={{
//                'gap': '$2',
//                'height': '100%',
//                'flexDirection': 'column',
//                'pt': '$5',
//                '@lg': {
//                   flexDirection: 'row',
//                },
//             }}
//             justify={'center'}
//          >
//             {/* Chart Section */}
//             <Box
//                css={{
//                   'width': '100%',
//                   '@lg': {
//                      width: '100%',
//                   },
//                   'px': '$2',
//                   'marginTop': '50px',
//                   'mt': '$8',
//                }}
//             >
//                <Text
//                   h3
//                   css={{
//                      'textAlign': 'left', 
//                      paddingLeft: '$10',  
//                      '@lg': {
//                         textAlign: 'left', 
//                      },
//                   }}
//                >
//                   Location
//                </Text>
//                <Box
//                   css={{
//                      width: '100%',
//                      backgroundColor: '$accents0',
//                      boxShadow: '$lg',
//                      borderRadius: '$2xl',
//                      px: '$10',
//                      py: '$10',
//                   }}
//                >
//                   <Chart />
//                   {/* Optionally display fetched data */}
//                   {data && (
//                      <Flex direction="column" css={{mt: '$4'}}>
//                         <Text>Fetched Data:</Text>
//                         <pre>{JSON.stringify(data, null, 2)}</pre>
//                      </Flex>
//                   )}
//                </Box>
//             </Box>

//             {/* Section with Transactions and Agents */}
//             <Box
//                css={{
//                   'width': '100%',
//                   '@lg': {
//                      width: '40%',
//                   },
//                   'px': '$12',
//                   'mt': '$8',
//                }}
//             >
//                <Flex
//                   direction={'column'}
//                   justify={'center'}
//                   css={{
//                      'gap': '$8',
//                      'flexDirection': 'column',
//                      '@lg': {
//                         flexDirection: 'column',
//                      },
//                   }}
//                >
//                   <CardTransactions />
//                </Flex>
//             </Box>
//          </Flex>
//       </Box>
//    );
// };

// export default Content;


import React, { useState, useEffect } from 'react';
import { Text, Link } from '@nextui-org/react';
import { Box } from '../styles/box';
import dynamic from 'next/dynamic';
import { Flex } from '../styles/flex';
import { CardTransactions } from './list_up';

const Chart = dynamic(
   () => import('./Building_model').then((mod) => mod.Steam),
   {
      ssr: false,
   }
);

export const Content = () => {
   // State to store the fetched data
   const [data, setData] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Fetch data function
   const fetchData = async () => {
      try {
         const response = await fetch('/api/gcv');
         if (!response.ok) {
            throw new Error('Failed to fetch data');
         }
         const result = await response.json();
         setData(result);
         setLoading(false);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'An unknown error occurred');
         setLoading(false);
      }
   };

   // Fetch data on component mount and at regular intervals
   useEffect(() => {
      fetchData();

      const interval = setInterval(fetchData, 100); // Fetch data every 10 seconds
      return () => clearInterval(interval); // Clear interval on component unmount
   }, []);

   // Render loading state
   if (loading) {
      return (
         <Box css={{overflow: 'hidden', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading...</Text>
         </Box>
      );
   }

   // Render error state
   if (error) {
      return (
         <Box css={{overflow: 'hidden', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text color="error">{error}</Text>
         </Box>
      );
   }

   return (
      <Box css={{overflow: 'hidden', height: '100%'}}>
         <Flex
            css={{
               'gap': '$2',
               'height': '100%',
               'flexDirection': 'column',
               'pt': '$5',
               '@lg': {
                  flexDirection: 'row',
               },
            }}
            justify={'center'}
         >
            {/* Chart Section */}
            <Box
               css={{
                  'width': '100%',
                  '@lg': {
                     width: '100%',
                  },
                  'px': '$2',
                  'marginTop': '50px',
                  'mt': '$8',
               }}
            >
               <Text
                  h3
                  css={{
                     'textAlign': 'left', 
                     paddingLeft: '$10',  
                     '@lg': {
                        textAlign: 'left', 
                     },
                  }}
               >
                  Location
               </Text>
               <Box
                  css={{
                     width: '100%',
                     backgroundColor: '$accents0',
                     boxShadow: '$lg',
                     borderRadius: '$2xl',
                     px: '$10',
                     py: '$10',
                  }}
               >
                  <Chart />
                  {/* Optionally display fetched data */}
                  {data && (
                     <Flex direction="column" css={{mt: '$4'}}>
                        <Text>Fetched Data:</Text>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                     </Flex>
                  )}
               </Box>
            </Box>

            {/* Section with Transactions and Agents */}
            <Box
               css={{
                  'width': '100%',
                  '@lg': {
                     width: '40%',
                  },
                  'px': '$12',
                  'mt': '$8',
               }}
            >
               <Flex
                  direction={'column'}
                  justify={'center'}
                  css={{
                     'gap': '$8',
                     'flexDirection': 'column',
                     '@lg': {
                        flexDirection: 'column',
                     },
                  }}
               >
                  <CardTransactions />
               </Flex>
            </Box>
         </Flex>
      </Box>
   );
};

export default Content;
