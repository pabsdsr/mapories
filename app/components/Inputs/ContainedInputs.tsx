'use client';

import { Select, TextInput } from '@mantine/core';
import {AddressInput} from './AddressInput'
import classes from './ContainedInputs.module.css';

export function ContainedInputs() {
  return (
    <>
      <TextInput label="Title" placeholder="First Time In Chicago" classNames={classes} />
      <TextInput label="Description" placeholder="I got to see the bean" classNames={classes} />

    </>
  );
}