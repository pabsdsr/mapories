'use client';

import React, { useEffect, useRef } from "react";
import {AddressInput} from '../Inputs/AddressInput'

import { ContainedInputs } from "../Inputs/ContainedInputs";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Globe.module.css";



export function Globe () {
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node == null) {
      return;
    }
  
    const newMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      // style: "mapbox://styles/mapbox/streets-v11",
      // center: [-122.4376, 37.7577],
      // zoom: 8,
    });
    setMap(newMap);

    return () => newMap.remove();
  }, []);

  return (
    <div className={styles.mapView}>
      <div id="map-container" ref={mapNode} className={styles.mapContainer} />
      <div className={styles.sidebar}>
        <AddressInput></AddressInput>
        <ContainedInputs></ContainedInputs>
      </div>
    </div>
  )
}
