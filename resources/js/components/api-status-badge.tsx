import { cn } from '@/lib/utils';
import type { ApiExampleResponse } from '@/types/api/api-types';
import { Check, CloudAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';

export const ApiStatusBadge = () => {
    const [isApiConnected, setIsApiConnected] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch(`/api/v1/example`, {
                    method: 'GET',
                    signal: controller.signal,
                });
                const data: ApiExampleResponse = await res.json();

                if (!data || !data.status) {
                    controller.abort();
                    return;
                }
                setIsApiConnected(true);
            } catch (err) {
                if (err) {
                    controller.abort();
                    console.error(err);
                }
            }
        })();
    }, []);

    return (
        <Badge
            variant={'default'}
            className={cn(
                'transition-all',
                isApiConnected && 'bg-green-600 hover:bg-green-500',
                !isApiConnected && 'bg-red-600 hover:bg-red-500',
            )}
        >
            {!isApiConnected ? <CloudAlert /> : <Check />}
            {!isApiConnected ? "API isn't connected" : 'API is connected'}
        </Badge>
    );
};
