'use client';
import { Button } from '@mantine/core';
import React from 'react';
import { useSession, signIn } from "next-auth/react";
import { blob } from 'stream/consumers';
import { getApiURL } from '@/utils/api';
import axios from 'axios';

// Types for Google APIs
declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface DriveImagePickerProps {
  onImageSelect: (image: { id: string, name: string, blob: string}) => void;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;



export function DriveImagePicker({ onImageSelect }: DriveImagePickerProps) {
  const { data: session, status } = useSession();
  const [isPickerApiLoaded, setIsPickerApiLoaded] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && session?.accessToken) {
      const loadPickerApi = () => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          window.gapi.load('picker', () => {
            setIsPickerApiLoaded(true);
          });

          window.gapi.load('client', () => {
            window.gapi.client.init({
              apiKey: API_KEY,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            }).then(() => {
              console.log('GAPI client initialized');
            }).catch((error: any) => {
              console.error('Error initializing GAPI client', error);
              setError('Failed to initialize Google Drive API');
            });
          });
        };
        script.onerror = () => {
          setError('Failed to load Google Picker API');
        };
        document.body.appendChild(script);
      };

      loadPickerApi();
    }
  }, [session]);

  const createPicker = () => {
    if (!session?.accessToken) {
      setError("No access token available");
      return;
    }
    
    setLoading(true);
    
    try {
      const folderId = '1ptW7LMoP-4DbKY-xn6DD8YVbH3kHRQw4';
      
      const token = session.accessToken as string;
      
      const view = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS_IMAGES)
        .setParent(folderId)
        .setIncludeFolders(true)
        .setSelectFolderEnabled(false);
        
      const pickerBuilder = new window.google.picker.PickerBuilder()
        .addView(view)
        .setOAuthToken(token)
        .setDeveloperKey(API_KEY)
        .setCallback(pickerCallback)
        .setTitle('Select images from Drive');
        
      const picker = pickerBuilder.build();
      picker.setVisible(true);
    } catch (err) {
      console.error("Error creating picker", err);
      setError("Error creating file picker. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  
  const pickerCallback = async (data: any) => {
    if (data.action === window.google.picker.Action.PICKED && data.docs.length > 0) {

      const fileId = data.docs[0].id;
      const fileName = data.docs[0].name;

      try {
        const fileResponse = await axios.get(
          `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
            responseType: 'arraybuffer'
          }
        )

        const base64Image = Buffer.from(fileResponse.data, 'binary').toString('base64');

        const base64DataUrl = `data:image/png;base64,${base64Image}`;

        const imageData = {
          id: fileId,
          name: fileName,
          blob: base64DataUrl,
        }

        onImageSelect(imageData);

      } catch (error) {
        console.error("error getting file:", error);
      }

    }
      
  };

  const handleOpenPicker = () => {
    if (status === "unauthenticated") {
      signIn("google");
    } else if (isPickerApiLoaded && session?.accessToken) {
      createPicker();
    } else if (!isPickerApiLoaded && session?.accessToken) {
      setError("Picker API is still loading. Please wait a moment.");
    }
  };


  return (
    <div className="p-4">
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <div className="flex gap-2 mb-4">
        <Button 
          onClick={handleOpenPicker} 
          disabled={loading || (status === "loading")}
          color="blue"
        >
          {loading ? 'Loading...' : 
           status === "unauthenticated" ? 'Sign in with Google' : 
           'Select Images from Drive'}
        </Button>
        
      </div>
    
      
    </div>
  );
}