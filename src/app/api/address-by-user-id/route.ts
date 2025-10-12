import { auth, prisma } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { address } = body;

        if (!address || typeof address !== 'string' || !address.length) {
            return NextResponse.json(
                { message: 'Invalid address', status: 0 },
                { status: 400 },
            );
        }

        const session = await auth.api.getSession(request);
        console.log('session:', session);

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Unauthorized', status: 0 },
                { status: 401 },
            );
        }

        await prisma.addresses.create({
            data: {
                address,
                userId: session.user.id,
            },
        });

        return NextResponse.json({
            message: 'Address by user ID route is working!',
            status: 1,
        });
    } catch (error) {
        console.error('Error in POST /api/address-by-user-id:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', status: 0 },
            { status: 500 },
        );
    }
}

export async function GET(request: Request) {
    try {
        const session = await auth.api.getSession(request);
        console.log('session:', session);

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Unauthorized', status: 0 },
                { status: 401 },
            );
        }

        const addresses = await prisma.addresses.findMany({
            where: { userId: session.user.id },
        });

        return NextResponse.json({ addresses, status: 1 });
    } catch (error) {
        console.error('Error in GET /api/address-by-user-id:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', status: 0 },
            { status: 500 },
        );
    }
}

export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const addressId = url.searchParams.get('id');

        if (!addressId) {
            return NextResponse.json(
                { message: 'Address ID is required', status: 0 },
                { status: 400 },
            );
        }

        const body = await request.json();
        const { address } = body;

        if (!address || typeof address !== 'string' || !address.length) {
            return NextResponse.json(
                { message: 'Invalid address', status: 0 },
                { status: 400 },
            );
        }

        const session = await auth.api.getSession(request);
        console.log('session:', session);

        if (!session || !session.user) {
            return NextResponse.json(
                { message: 'Unauthorized', status: 0 },
                { status: 401 },
            );
        }

        await prisma.addresses.updateMany({
            where: {
                id: addressId,
                userId: session.user.id,
            },
            data: {
                address,
            },
        });

        return NextResponse.json({
            message: 'Address updated successfully',
            status: 1,
        });
    } catch (error) {
        console.error('Error in PUT /api/address-by-user-id:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', status: 0 },
            { status: 500 },
        );
    }
}
