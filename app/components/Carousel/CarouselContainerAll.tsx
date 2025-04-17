'use client';
import React, { useEffect, useState } from "react";

import { Flex, Box, Modal, Text} from '@mantine/core';
import { getApiURL } from '../../utils/api';
import { CarouselCard } from './CarouselCard';
import { SkeletonCard } from './SkeletonCard';


interface Pin {
    id?: string | number;
    title?: string;
    address?: string;
    description?: string;
    image?: string;
}


export function CarouselContainerAll(){

    const [pins, setPins] = useState<Pin[]>([]);
    const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const baseURL = getApiURL();

    // might be good to put this into a utils file

    const fetchPins = async () => {
        try {
          const response = await fetch(`${baseURL}/pin`, {
            method: 'GET'});
          
          if (response.status === 200) {
            const pins = await response.json();
    
            setPins(pins.message);
            setLoading(false);
          }
          
        } catch (error) {
          console.error("Error fetching pins:", error);
        }
    }

    useEffect(() => {
        fetchPins();
    }, []);

    const handlePinClick = (pin: Pin) => {
        setSelectedPin(pin);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const skeletonCards = Array(6).fill(0).map((_, index) => (
        <Box 
            key={`skeleton-${index}`}
            style={{ 
                flex: '1 1 calc(33.333% - 16px)', 
                minWidth: '300px', 
                maxWidth: '400px',
                marginBottom: '16px'
            }}
        >
            <SkeletonCard />
        </Box>
    ));


    return (
        <>
            <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {loading ? (
                    // Show skeleton cards while loading
                    skeletonCards
                ) : Array.isArray(pins) && pins.length > 0 ? (
                    // Show actual pins when loaded
                    pins.map((pin, index) => (
                        <Box 
                            key={pin.id || index}
                            style={{ 
                                flex: '1 1 calc(33.333% - 16px)', 
                                minWidth: '300px', 
                                maxWidth: '400px',
                                marginBottom: '16px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handlePinClick(pin)}
                        >
                            <CarouselCard
                                title={pin.title || "Untitled Pin"}
                                image={pin.image}
                            />
                        </Box>
                    ))
                ) : (
                    // Show message when no pins are available
                    <Box style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
                        <Text>No pins found. Create your first pin!</Text>
                    </Box>
                )}
            </Flex>
            {/* <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="row"
                wrap="wrap"
            >
                {Array.isArray(pins) && pins.length > 0 ? (
                    pins.map((pin, index) => (
                        <Box 
                            key={pin.id || index}
                            style={{ 
                                flex: '1 1 calc(33.333% - 16px)', 
                                minWidth: '300px', 
                                maxWidth: '400px',
                                marginBottom: '16px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handlePinClick(pin)}
                        >
                            <CarouselCard
                                title={pin.title || "Untitled Pin"}
                                image = {pin.image}
                            />
                        </Box>
                    ))
                ) : (
                    <Box style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
                        {pins === null ? "Error loading pins." : "Loading pins..."}
                    </Box>
                )}
            </Flex> */}

            {/* Modal for expanded view */}
            <Modal
                opened={modalOpen}
                onClose={closeModal}
                title=""
                size="lg"
                centered
            >
                {selectedPin && (
                    <Box style={{ padding: '20px' }}>
                        <CarouselCard
                            title={selectedPin.title || "Untitled Pin"}
                            address={selectedPin.address || "No address provided"}
                            description={selectedPin.description || "No description available"}
                            image = {selectedPin.image}
                            expanded={true} // New prop to indicate expanded view
                        />
                    </Box>
                )}
            </Modal>
        </>
        
      );
}