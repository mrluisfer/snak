import type { ApiFood } from '@/types/api/api-types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useFetchFoods = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [foods, setFoods] = useState<Array<ApiFood>>([]);

    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();

        (async () => {
            const response = await fetch('/api/v1/foods', {
                method: 'GET',
                signal: controller.signal,
            });

            const data = await response.json();
            if (!data && !data.status) {
                toast.error('Failed to fetch foods', {
                    position: 'top-center',
                });
                controller.abort();
                return;
            }

            setFoods(data.data || []);
            setIsLoading(false);
        })();
    }, []);

    return { foods, setFoods, isLoading };
};
