'use client';
import React, { useEffect, useState } from "react";

import { Box, Skeleton, Card } from '@mantine/core';


interface Pin {
    id?: string | number;
    title?: string;
    address?: string;
    description?: string;
    image?: string;
}

// Skeleton card component for loading state
export function SkeletonCard() {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {/* Square skeleton for image */}
                <div style={{ position: 'relative', paddingTop: '100%' }}>
                    <Skeleton 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%', 
                            height: '100%'
                        }}
                    />
                </div>
            </Card.Section>
            
            <Box mt="md" mb="xs">
                <Skeleton height={20} width="70%" mb={8} />
            </Box>
        </Card>
    );
}