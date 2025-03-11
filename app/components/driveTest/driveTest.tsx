'use client';
import { Button } from '@mantine/core';
import { getApiURL } from '../../utils/api';
import React from 'react';

export function DriveTest() {
  const baseURL = getApiURL();
  const [images, setImages] = React.useState<string[]>([]);
  const handleClick = async (e:React.SyntheticEvent) => {
      e.preventDefault();
  
      const response = await fetch(`${baseURL}/drive`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      });

      if(response.ok) {
        const data = await response.json();
        const imageUrls = data.files.map((file: any) => `https://drive.google.com/uc?id=${file.id}`);
        setImages(imageUrls);
      }
  };

  return (
    <div>
      <Button onClick={handleClick}>Drive Test</Button>
      <div>
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Google Drive Image ${index}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
  
}