
'use client';

import { SessionProvider } from "next-auth/react";
import { DriveImagePicker } from "./DriveImagePicker";

interface DrivePickerWrapperProps {
  onImageSelect: (image: { id: string, name: string, blob: string}) => void;
}

export function DrivePickerWrapper({ onImageSelect }: DrivePickerWrapperProps) {
  return (
    <SessionProvider>
      <DriveImagePicker onImageSelect={onImageSelect}/>
    </SessionProvider>
  );
}