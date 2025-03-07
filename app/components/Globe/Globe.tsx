'use client';

import React, { useEffect, useRef } from "react";
import {AddressInput} from '../Inputs/AddressInput'
import { getApiURL } from '../../utils/api';
import { ContainedInputs } from "../Inputs/ContainedInputs";
import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Globe.module.css";
import classes from '../Inputs/ContainedInputs.module.css';



export function Globe () {
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const mapNode = React.useRef(null);
  const baseURL = getApiURL();
  const [address, setAddress] = React.useState('');
  const [fullAddress, setFullAddress] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault();

    const formData = {
      fullAddress,
      title,
      description
    };
    const response = await fetch(`${baseURL}/pin`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    console.log(response);
  };

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node == null) {
      return;
    }
  
    const newMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    });
    setMap(newMap);

    return () => newMap.remove();
  }, []);

  return (
    <div className={styles.mapView}>
      <div id="map-container" ref={mapNode} className={styles.mapContainer} />
      <div className={styles.sidebar}>
        <form>
          <AddressInput address={address}
            onChange={(newAddress) => setAddress(newAddress)}
            onAddressRetrieve={(fullAddress) => setFullAddress(fullAddress)}>
          </AddressInput>
          <TextInput label="Title" 
            placeholder="First Time In Chicago" 
            classNames={classes}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TextInput label="Description" 
            placeholder="I got to see the bean" 
            classNames={classes}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <Button onClick={handleSubmit}>Create Pin</Button>
        </form>
      </div>
    </div>
  )
}
