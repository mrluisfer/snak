'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Loader } from './ui/shadcn-io/ai/loader';
import { Status, StatusIndicator, StatusLabel } from './ui/shadcn-io/status';

export const ApiStatusBadge = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isApiConnected, setIsApiConnected] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await axios(`/api/v1/example`, {
                    method: 'GET',
                    signal: controller.signal,
                });
                if (res.status !== 200) {
                    controller.abort();
                    setIsLoading(false);
                    return;
                }
                setIsApiConnected(true);
                setIsLoading(false);
            } catch (err) {
                if (err) {
                    controller.abort();
                    setIsLoading(false);
                    setIsApiConnected(false);
                    console.error(err);
                }
            }
        })();
    }, []);

    if (isLoading) {
        return (
            <Status status="maintenance">
                <Loader />
                <StatusLabel>Connecting to API...</StatusLabel>
            </Status>
        );
    }

    return (
        <Status status={isApiConnected ? 'online' : 'offline'}>
            <StatusIndicator />
            <StatusLabel>
                {isApiConnected ? 'API is connected' : "API isn't connected"}
            </StatusLabel>
        </Status>
    );
};
