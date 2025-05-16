'use client';

import { Flex, Box, Card, Text, Button, Center, Image, Group, Stack } from '@mantine/core';
import { getApiURL } from '../../utils/api';
import { CarouselCard } from './CarouselCard';
import { Carousel } from '@mantine/carousel';
import { SkeletonCard } from './SkeletonCard';
import { useEffect, useState } from 'react';
import classes from './CarouselCard.module.css';

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
    const [loading, setLoading] = useState(true);

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

      const skeletonCards = Array(3).fill(0).map((_, index) => (
            <Box 
                key={`skeleton-${index}`}
                style={{ 
                    flex: '1 1 calc(33.333% - 16px)', 
                    minWidth: '300px', 
                    maxWidth: '400px',
                    marginBottom: '16px'
                }}
            >
                <SkeletonCard />
            </Box>
      ));
  

    const fetchPins = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/pin`, {
          method: 'GET'});
        
        if (response.status === 200) {
          const pins = await response.json();
          const randomDisplayPins = getRandomSample(pins.message, 3);
          // setDisplayPins(randomDisplayPins);
          setPins(pins.message);
          
        }
        
      } catch (error) {
        console.error("Error fetching pins:", error);
      } finally {
        setLoading(false);
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
          { loading ? (
              skeletonCards
          ) : displayPins.length > 0 ? (
              displayPins.map((pin, index) => (
                <Box key={index} style={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '300px', maxWidth: '400px' }}>
                  <CarouselCard 
                      title = {pin.title}
                      address = {pin.address}
                      description= {pin.description}
                      image= {pin.images}
                  />
                </Box>
              ))
          ) : (
            <Center style={{ width: '50vw', height: '90vh' }}>
              <Stack>
                <Flex gap = "md">
                  <Box
                    style={{ 
                      flex: '1 1 calc(33.333% - 16px)', 
                      minWidth: '300px', 
                      maxWidth: '400px',
                      marginBottom: '16px',
                      cursor: 'pointer'
                  }}
                  >
                    <Card radius="md" withBorder padding="xl">
                      <Card.Section>
                        <Carousel classNames={classes}>

                          <Carousel.Slide key="single-image">
                            <div style={{ position: 'relative', paddingTop: '100%' }}>
                              <Image 
                                src= "/MaporiesHero.png"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                          </Carousel.Slide>
                        </Carousel>
                      </Card.Section>
                      <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={700}>Map Your Memories:</Text>
                        <Text fw={300} size="sm">(Carmel By The Sea)</Text>
                      </Group>
                      <Text size="sm" c="dimmed" fw={500}>
                        Make a pin for all your best memories! Relive each memory with thoughtful images and descriptions.
                      </Text>
                    </Card>
                  </Box>
                  <Box
                    style={{ 
                      flex: '1 1 calc(33.333% - 16px)', 
                      minWidth: '300px', 
                      maxWidth: '400px',
                      marginBottom: '16px',
                      cursor: 'pointer'
                  }}
                  >
                    <Card radius="md" withBorder padding="xl">
                      <Card.Section>
                        <Carousel classNames={classes}>

                          <Carousel.Slide key="single-image">
                            <div style={{ position: 'relative', paddingTop: '100%' }}>
                              <Image 
                                src= "/maporiesTutorial.png"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                          </Carousel.Slide>
                        </Carousel>
                      </Card.Section>
                      <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={700}>How To:</Text>
                      </Group>
                      <Text size="sm" c="dimmed" fw={500}>
                        Navigate to the globe page and search for an address that is associated with your memory. Add a title, description, and image!
                      </Text>
                    </Card>
                  </Box>
                </Flex>
                <Button radius = "md" mt = "md">
                  Get Started!
                </Button>
              </Stack>
            </Center>
 
          )}
        </Flex>
        
      );
}