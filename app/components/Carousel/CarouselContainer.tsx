'use client';
import { IconStar } from '@tabler/icons-react';
import { Flex, Box } from '@mantine/core';
import { getApiURL } from '../../utils/api';
import { CarouselCard } from './CarouselCard';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './CarouselCard.module.css';
import { useEffect, useState } from 'react';

interface Pin {
  title: string;
  address: string;
  description: string;
  images: string;
}


export function CarouselContainer(){
    const [pins, setPins] = useState([]);
    const [displayPins, setDisplayPins] = useState<Pin[]>([]);
    const baseURL = getApiURL();

    const getRandomSample = (array: Pin[], sampleSize: number) => {
        if(!array || array.length === 0){
          return [];
        }
        if(array.length <= sampleSize){
          return [...array];
        }

        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray.slice(0, sampleSize);
    }
  

    const fetchPins = async () => {
      try {
        const response = await fetch(`${baseURL}/pin`, {
          method: 'GET'});
        
        if (response.status === 200) {
          const pins = await response.json();
          const randomDisplayPins = getRandomSample(pins.message, 3);
          console.log("these are our randomly selected pins", randomDisplayPins);
          setDisplayPins(randomDisplayPins);
          setPins(pins.message);
        }
        
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    }

    useEffect(() => {
      fetchPins();
      const interval = setInterval(() => {
        fetchPins();
      }, 60000);

      return () => {
        clearInterval(interval);
      }
      
    }, []);

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