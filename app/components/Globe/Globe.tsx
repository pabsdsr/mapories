'use client';

import React, { useEffect, useRef } from "react";
import {AddressInput} from '../Inputs/AddressInput'
import { getApiURL } from '../../utils/api';
import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Globe.module.css";
import "./Popup.css";
import classes from '../Inputs/ContainedInputs.module.css';
import { DrivePickerWrapper } from "../driveTest/DrivePickerWrapper";



export function Globe () {
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const mapNode = React.useRef(null);
  const baseURL = getApiURL();
  const [address, setAddress] = React.useState('');
  const [fullAddress, setFullAddress] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [pins, setPins] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState<{ id: string; name: string, blob: string} | null>(null);

  

  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault();

    const formData = {
      fullAddress,
      title,
      description,
      image: selectedImage?.blob,
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

  const fetchPins = async () => {
    try {
      const response = await fetch(`${baseURL}/pin`, {
        method: 'GET'});
      
      if (response.status === 200) {
        const pins = await response.json();

        setPins(pins.message);
      }
      
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  }

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node == null) {
      return;
    }

    fetchPins();
   
    const newMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    });
    setMap(newMap);

    return () => newMap.remove();
  }, []);

  React.useEffect(() => {
    if (map && pins.length > 0 ) {
      pins.forEach((pin) => {
        const { longitude, latitude, title, description, image } = pin;
        if (!isNaN(longitude) && !isNaN(latitude)) {
          const marker = new mapboxgl.Marker();
          const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat([longitude, latitude])
            .setHTML(`
              <h3>${title}</h3>
              <p>${description}</p>
              <img src="${image}" alt="${title}" style="width: 100px;" />
            `);
          marker.setLngLat([longitude, latitude])
              .setPopup(popup)
              .addTo(map);
        }
      });
    }
  }, [map, pins]);


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
            className={styles.formFieldTopBotton} 
            classNames={classes}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <TextInput label="Description" 
            placeholder="I got to see the bean"
            className={styles.formField} 
            classNames={classes}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <DrivePickerWrapper onImageSelect={setSelectedImage}/>
          <Button onClick={handleSubmit} className={styles.formFieldTop}>Create Pin</Button>
        </form>
      </div>
    </div>
  )
}
