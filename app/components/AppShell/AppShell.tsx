'use client';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '../Navigation/Navbar'
import React, { ReactNode } from 'react';

interface AppStructureProps {
    children: ReactNode;
}

export function AppStructure({ children }: AppStructureProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Mapories</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar></Navbar>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}