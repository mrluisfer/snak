import { auth, prisma } from '@/lib/auth';
import { ApiResponse } from '@/types/api/api-types';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await auth.api.getSession(request);

        if (!session || !session.user) {
            return NextResponse.json<ApiResponse<null>>(
                { error: 'Unauthorized', status: 0, data: null },
                { status: 401 },
            );
        }

        const { id } = await params;
        const addressId = id;

        if (!addressId) {
            return NextResponse.json<ApiResponse<null>>(
                { error: 'Address ID is required', status: 0, data: null },
                { status: 400 },
            );
        }

        await prisma.addresses.deleteMany({
            where: {
                id: addressId,
                userId: session.user.id,
            },
        });

        return NextResponse.json<ApiResponse<string>>({
            error: undefined,
            status: 1,
            data: 'Address deleted successfully',
        });
    } catch (error) {
        console.error('Error in DELETE /api/delete-address/:id:', error);
        return NextResponse.json<ApiResponse<null>>(
            { error: 'Failed to delete address', status: 0, data: null },
            { status: 500 },
        );
    }
}
