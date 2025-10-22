import { Product } from '@/generated/prisma';
import { prisma } from '@/lib/auth';
import { ApiResponse } from '@/types/api/api-types';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await prisma.product.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!data.length) {
            return NextResponse.json<ApiResponse<Array<undefined>>>({
                error: 'No products found',
                status: 0,
                data: [],
            });
        }

        return NextResponse.json<ApiResponse<Array<Product>>>({
            error: undefined,
            status: 1,
            data,
        });
    } catch (error) {
        console.error('Error in GET /api/products/all-products:', error);
        return NextResponse.json<ApiResponse<null>>(
            {
                error: 'Failed to fetch products',
                status: 0,
                data: null,
            },
            { status: 500 },
        );
    }
}
