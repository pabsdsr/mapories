'use client';
import { IconStar } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './CarouselCard.module.css';

interface CarouselCardProps {
  address: string;
  title: string;
  description: string;
}

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
];

export function CarouselCard({address, title, description}: CarouselCardProps) {
  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder padding="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Text fw={500} fz="lg">
          {title}
        </Text>
{/* 
        <Group gap={5}>
          <IconStar size={16} />
          <Text fz="xs" fw={500}>
            4.78
          </Text>
        </Group> */}
      </Group>

      <Text fz="sm" c="dimmed" mt="sm">
        {description}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {address}
      </Text>
      <Group justify="space-between" mt="md">
        {/* <div>
          <Text fz="xl" span fw={500} className={classes.price}>
            397$
          </Text>
          <Text span fz="sm" c="dimmed">
            {' '}
            / night
          </Text>
        </div> */}

        <Button radius="md">View</Button>
      </Group>
    </Card>
  );
}