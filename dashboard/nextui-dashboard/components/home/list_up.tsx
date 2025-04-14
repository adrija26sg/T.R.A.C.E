import { Avatar, Card, Text } from '@nextui-org/react';
import React, { useState } from 'react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';

// Define the Soldier type
interface Soldier {
  id: number;
  name: string;
  role: string;
  status: 'Alive' | 'Injured' | 'Not Responding';
  age: number;
  floorNumber: string;
  dateOfJoining: string;
  photoUrl: string;
}

export const CardTransactions = () => {
  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);

  const soldiers: Soldier[] = [
    {
      id: 287945,
      name: 'Soldier 1',
      role: 'Infantry Rifleman',
      status: 'Alive',
      age: 28,
      floorNumber: 'Floor 3',
      dateOfJoining: '2020-01-15',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026026',
    },
    {
      id: 135135,
      name: 'Soldier 2',
      role: 'Special Forces Operative',
      status: 'Injured',
      age: 35,
      floorNumber: 'Floor 1',
      dateOfJoining: '2018-07-22',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024e',
    },
    {
      id: 377894,
      name: 'Soldier 3',
      role: 'Medic Specialist',
      status: 'Not Responding',
      age: 32,
      floorNumber: 'Floor 2',
      dateOfJoining: '2016-03-10',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026025',
    },
    {
      id: 478512,
      name: 'Soldier 4',
      role: 'Sniper',
      status: 'Alive',
      age: 29,
      floorNumber: 'Floor 4',
      dateOfJoining: '2021-06-18',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026026',
    },
    {
      id: 589123,
      name: 'Soldier 5',
      role: 'Communications Officer',
      status: 'Not Responding',
      age: 40,
      floorNumber: 'Floor 5',
      dateOfJoining: '2015-02-14',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026027',
    },
    {
      id: 679874,
      name: 'Soldier 6',
      role: 'Engineer',
      status: 'Injured',
      age: 33,
      floorNumber: 'Floor 2',
      dateOfJoining: '2019-08-23',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026028',
    },
    {
      id: 781236,
      name: 'Soldier 7',
      role: 'Tank Operator',
      status: 'Alive',
      age: 27,
      floorNumber: 'Floor 6',
      dateOfJoining: '2022-03-11',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026029',
    },
    {
      id: 891245,
      name: 'Soldier 8',
      role: 'Pilot',
      status: 'Not Responding',
      age: 34,
      floorNumber: 'Floor 7',
      dateOfJoining: '2017-05-20',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026030',
    },
    {
      id: 992134,
      name: 'Soldier 9',
      role: 'Field Medic',
      status: 'Injured',
      age: 36,
      floorNumber: 'Floor 3',
      dateOfJoining: '2016-11-09',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026031',
    },
    {
      id: 103567,
      name: 'Soldier 10',
      role: 'Artillery Specialist',
      status: 'Alive',
      age: 30,
      floorNumber: 'Floor 8',
      dateOfJoining: '2023-01-05',
      photoUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026032',
    },
  ];

  // Sort soldiers by status: Not Responding > Injured > Alive
  const sortedSoldiers = soldiers.sort((a, b) => {
    // Ensure Soldier 1 always comes first
    if (a.id === 287945) return -1; // Soldier 1 is always at the top
    if (b.id === 287945) return 1;
  
    // Sort the remaining soldiers by status: Not Responding > Injured > Alive
    const statusOrder: { [key in Soldier['status']]: number } = {
      'Not Responding': 0,
      Injured: 1,
      Alive: 2,
    };
  
    return statusOrder[a.status] - statusOrder[b.status];
  });
  

  const getStatusColor = (status: Soldier['status']) => {
    switch (status) {
      case 'Alive':
        return '$green600';
      case 'Injured':
        return '$yellow600';
      case 'Not Responding':
        return '$red600';
      default:
        return '$accents8';
    }
  };

  const soldierCounts = soldiers.reduce(
    (acc, soldier) => {
      acc[soldier.status] += 1;
      return acc;
    },
    { Alive: 0, Injured: 0, 'Not Responding': 0 }
  );

  return (
    <Card
      css={{
        mw: '800px',
        height: 'auto',
        bg: '$accents0',
        borderRadius: '$xl',
        px: '$6',
        py: '$10',
        boxShadow: '$lg',
      }}
    >
      <Card.Body>
        <Flex align="center" justify="between" css={{ mb: '$4' }}>
          <Text h3 css={{ textAlign: 'center', m: 0 }}>
            Soldier Status
          </Text>
          <Text css={{ color: '$gray600' }}> Alive:</Text> 
          <Text css={{ color: '$green600' }}> {soldierCounts.Alive}</Text>
          <Text css={{ color: '$gray600' }}> | Injured:</Text>
          <Text css={{ color: '$yellow600' }}> {soldierCounts.Injured}</Text>
          <Text css={{ color: '$gray600' }}> | Not Responding:</Text>    
          <Text css={{ color: '$red600' }}> {soldierCounts['Not Responding']} </Text>
        </Flex>
        <Flex
          css={{
            gap: '$12',
            py: '$2',
            px: '$4',
            borderBottom: '2px solid $gray300',
            backgroundColor: '$accents1',
            padding: '$6',
            borderRadius: '$md',
            boxShadow: '$sm',
            textAlign: 'left',
          }}
          justify="between"
        >
          <Text b css={{ flex: 1 }}>Name</Text>
          <Text b css={{ flex: 1 }}>ID</Text>
          <Text b css={{ flex: 1 }}>Floor</Text>
          <Text b css={{ flex: 1 }}>Status</Text>
        </Flex>
        <Flex
          css={{
            gap: '$4',
            flexDirection: 'column',
            mt: '$4',
            maxHeight: '300px', // Limit height for scrolling
            overflowY: 'auto',
          }}
        >
          {sortedSoldiers.map((soldier) => (
            <Flex
              key={soldier.id}
              css={{
                gap: '$8',
                cursor: 'pointer',
                px: '$6',
                py: '$5',
                borderRadius: '$md',
                transition: 'background-color 0.3s',
                '&:hover': { bg: '$accents2' },
                alignItems: 'center',
                boxShadow: '$xs',
                textAlign: 'left',
              }}
              align={'center'}
              justify="between"
              onClick={() => setSelectedSoldier(soldier)}
            >
              <Text span size={'$base'} weight={'semibold'} css={{ flex: 1 }}>
                {soldier.name}
              </Text>
              <Text span size={'$base'} css={{ flex: 1 }}>
                {soldier.id}
              </Text>
              <Text span size={'$base'} css={{ flex: 1 }}>
                {soldier.floorNumber}
              </Text>
              <Text span css={{ color: getStatusColor(soldier.status), flex: 1 }} size={'$xs'}>
                {soldier.status}
              </Text>
            </Flex>
          ))}
        </Flex>

        {selectedSoldier && (
          <Box
            css={{
              mt: '$8',
              p: '$6',
              bg: '$accents1',
              borderRadius: '$lg',
              boxShadow: '$sm',
              transition: 'transform 0.3s',
              transform: selectedSoldier ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <Text h4 css={{ mb: '$4' }}>
              {selectedSoldier.name} - Detailed Profile
            </Text>
            <Flex direction="column" css={{ gap: '$4' }}>
              <Flex align="center" justify="center" css={{ mb: '$4' }}>
                <Avatar
                  size="lg"
                  src={selectedSoldier.photoUrl}
                  bordered
                  color="gradient"
                />
              </Flex>

              <Flex align="center" justify="between">
                <Text b>Name:</Text>
                <Text>{selectedSoldier.name}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text b>ID:</Text>
                <Text>{selectedSoldier.id}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text b>Role:</Text>
                <Text>{selectedSoldier.role}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text b>Floor Number:</Text>
                <Text>{selectedSoldier.floorNumber}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text b>Age:</Text>
                <Text>{selectedSoldier.age}</Text>
              </Flex>
              <Flex align="center" justify="between">
                <Text b>Date of Joining:</Text>
                <Text>{selectedSoldier.dateOfJoining}</Text>
              </Flex>
            </Flex>
          </Box>
        )}
      </Card.Body>
    </Card>
  );
};