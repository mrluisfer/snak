import { prisma } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const body: {
            name: string;
            description?: string;
            address?: string;
            userId: string;
        } = await req.json();
        // Here you would typically handle the business creation logic,
        // such as validating the input and saving it to a database.
        if (!body.address) {
            const firstAddress = await prisma.addresses.findFirst({
                where: {
                    userId: body.userId,
                },
            });
            body.address = firstAddress?.address || '';
        }

        const businessResponse = await prisma.business.create({
            data: {
                name: body.name,
                description: body.description,
                address: body.address,
            },
        });

        if (!businessResponse) {
            return new Response(
                JSON.stringify({
                    status: 0,
                    error: 'Failed to create business',
                }),
                {
                    status: 500,
                },
            );
        }

        const businessMemberResponse = await prisma.businessMember.create({
            data: {
                businessId: businessResponse.id,
                userId: body.userId,
                role: 'OWNER',
            },
        });

        if (!businessMemberResponse) {
            return new Response(
                JSON.stringify({
                    status: 0,
                    error: 'Failed to create business',
                }),
                {
                    status: 500,
                },
            );
        }

        return new Response(JSON.stringify({ status: 1 }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error creating business:', error);
        return new Response(
            JSON.stringify({ status: 0, error: 'Failed to create business' }),
            {
                status: 500,
            },
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return new Response(
                JSON.stringify({
                    status: 0,
                    error: 'Missing userId parameter',
                }),
                {
                    status: 400,
                },
            );
        }

        const businessMembers = await prisma.businessMember.findMany({
            where: {
                userId,
            },
            include: {
                business: true,
            },
        });

        const businesses = businessMembers.map((member) => member.business);

        return new Response(JSON.stringify({ status: 1, businesses }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching businesses:', error);
        return new Response(
            JSON.stringify({ status: 0, error: 'Failed to fetch businesses' }),
            {
                status: 500,
            },
        );
    }
}
