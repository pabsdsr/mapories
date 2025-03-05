'use client';


import { useEffect, useRef } from "react";
import {AddressInput} from '../Inputs/AddressInput'
import { ContainedInputs } from "../Inputs/ContainedInputs";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./Globe.module.css";



export function Globe () {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current
    });

    return () => mapRef.current?.remove();
  }, []);

  return (
    <div className={styles.mapView}>
      <div id="map-container" ref={mapContainerRef} className={styles.mapContainer} />
      <div className={styles.sidebar}>
        <AddressInput></AddressInput>
        <ContainedInputs></ContainedInputs>
      </div>
    </div>
  );
}