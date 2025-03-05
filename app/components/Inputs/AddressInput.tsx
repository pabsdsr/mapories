'use client';
import React, { useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
// import { AddressAutofill } from '@mapbox/search-js-react';
import dynamic from 'next/dynamic';
import classes from './ContainedInputs.module.css';

const AddressAutofill = dynamic(
  () => import('@mapbox/search-js-react').then(mod => mod.AddressAutofill),
  { ssr: false }
);

export function AddressInput() {
  const [address, setAddress] = useState('');

  React.useEffect(() => {

    if (typeof window === "undefined") {
      return;
    }
  
  }, []);

  const handleRetrieve = (result: any) => {
    const fullAddress = result.features[0]?.properties?.full_address || '';
    console.log(fullAddress);
    setAddress(fullAddress); 

  };


  return (
    <form>
      <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN} onRetrieve={handleRetrieve}>
        <TextInput 
          type="text" 
          name="address" 
          autoComplete="address-line1" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter address..."
          label = "Address"
          classNames={classes}
        />
      </AddressAutofill>
    </form>
  );
}