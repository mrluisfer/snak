import { auth, prisma } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const session = await auth.api.getSession(request);

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Unauthorized', status: 0 },
                { status: 401 },
            );
        }

        const addressId = params.id;

        if (!addressId) {
            return NextResponse.json(
                { message: 'Address ID is required', status: 0 },
                { status: 400 },
            );
        }

        await prisma.addresses.deleteMany({
            where: {
                id: addressId,
                userId: session.user.id,
            },
        });

        return NextResponse.json({
            message: 'Address deleted successfully',
            status: 1,
        });
    } catch (error) {
        console.error('Error in DELETE /api/delete-address/:id:', error);
        return NextResponse.json(
            { message: 'Failed to delete address', status: 0 },
            { status: 500 },
        );
    }
}
