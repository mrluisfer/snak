'use client';

import { LoadingSpinner } from '@/components/shared/loadingSpinner';
import { Product } from '@/generated/prisma';
import { ApiResponse } from '@/types/api/api-types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AllProducts() {
    const { data, error, isLoading } = useSWR<ApiResponse<Product[]>>(
        '/api/products/all-products',
        fetcher,
    );

    if (isLoading) return <LoadingSpinner />;

    if (error) return <div>Error</div>;

    if(!data) return null

    return <div>All products</div>
}
