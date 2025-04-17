'use client';

import { Carousel } from '@mantine/carousel';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './CarouselCard.module.css';

interface CarouselCardProps {
  address?: string;
  title: string;
  description?: string;
  expanded?: boolean;
  image?: string;
}

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
];

export function CarouselCard({address, title, description, image, expanded = false}: CarouselCardProps) {


  // keep this in so that I can incorporate adding more images later

  // const slides = images.map((image) => (
  //   <Carousel.Slide key={image}>
  //     <Image src={image} height={220} />
  //   </Carousel.Slide>
  // ));



  return (
    <Card radius="md" withBorder padding="xl">
      <Card.Section>
        <Carousel classNames={classes}>

          <Carousel.Slide key="single-image">
            <div style={{ position: 'relative', paddingTop: '100%' }}>
              <Image 
                src={image} 
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

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="lg">
          {title}
        </Text>

      </Group>

      <Text fz="sm" c="dimmed" mt="sm">
        {description}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {address}
      </Text>
      <Group justify="space-between" mt="md">

        <Button radius="md">View</Button>
      </Group>
    </Card>
    
  );
}