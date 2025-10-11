import type { ApiFood } from '@/types/api/api-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useFetchFoods = () => {
    const [foods, setFoods] = useState<Array<ApiFood>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFoods = useCallback(async (signal?: AbortSignal) => {
        try {
            setIsLoading(true);

            const response = await fetch('/api/v1/foods', { signal });
            const data = await response.json();

            if (!response.ok || !data?.data) {
                throw new Error('Failed to fetch foods');
            }

            setFoods(data.data);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                toast.error('Error al obtener la lista de comidas', {
                    position: 'top-center',
                });
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Ejecuta la carga inicial
    useEffect(() => {
        const controller = new AbortController();
        fetchFoods(controller.signal);
        return () => controller.abort();
    }, [fetchFoods]);

    // Retorna también la función para recargar manualmente
    const refetch = useCallback(() => {
        const controller = new AbortController();
        fetchFoods(controller.signal);
        return () => controller.abort();
    }, [fetchFoods]);

    return { foods, isLoading, refetch, setFoods };
};
