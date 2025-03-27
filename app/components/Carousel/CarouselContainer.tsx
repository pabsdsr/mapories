'use client';
import { IconStar } from '@tabler/icons-react';
import { Flex, Box } from '@mantine/core';
import { getApiURL } from '../../utils/api';
import { CarouselCard } from './CarouselCard';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './CarouselCard.module.css';

export function CarouselContainer(){
    const baseURL = getApiURL();

    const handleSubmit = async (e:React.SyntheticEvent) => {
      e.preventDefault();
  
      const id = 1;
      const response = await fetch(`${baseURL}/pin/${id}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
    };

    return (
        <Flex
          gap="md"
          justify="center"
          align="flex-start"
          direction={{ base: 'column', sm: 'row' }}
          wrap="wrap"
        >
          <Box style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '300px', maxWidth: '400px' }}>
            <CarouselCard
                title = "Nicoles First Apartment"
                address = "3 Rose St, Dover NH"
                description='We spent valentines day here.'
             />
          </Box>
          
          <Box style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '300px', maxWidth: '400px' }}>
            <CarouselCard 
                title = "Moving back to SB, Senior Year"
                address = "650 Storke Rd, Goleta CA"
                description='My apartment senior year of college'
            />
          </Box>
          
          <Box style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '300px', maxWidth: '400px' }}>
            <CarouselCard
                title = "My child hood home"
                address = "5564 Homeside Ave, Los Angeles CA"
                description='The brown house'
            />
          </Box>
        </Flex>
        
      );
}