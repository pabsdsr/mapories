'use client';
import { Button, Container, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import classes from './Hero.module.css';

//maybe i want the hero to be the landing page, get started navigates to user auth, after auth then we have the rendered app.shell

export function Hero() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  }
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          An interactive{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            memory
          </Text>{' '}
          archive
        </h1>

        <Text className={classes.description} color="dimmed">
            Fill your globe with your memories and experiences.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            onClick={handleGetStarted}
          >
            Get started
          </Button>

        </Group>
      </Container>
    </div>
  );
}