'use client';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '../Navigation/Navbar'
import React, { ReactNode } from 'react';
import styles from "./AppShell.module.css";

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
        {/* <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        /> */}
        <div className="flex items-center justify-center w-full h-full text-center">
          {/* <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 
                          font-bold truncate max-w-full">
            Mapories
          </span> */}
          <span className={styles.title}>
              Mapories
          </span>
        </div>

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