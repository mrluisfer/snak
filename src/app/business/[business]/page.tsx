import { Providers } from '@/layout/providers';
import { SharedLayout } from '@/layout/shared-layout';

export default async function BusinessItemPage({
    params,
}: {
    params: Promise<{ business: string }>;
}) {
    const { business } = await params;
    return (
        <Providers>
            <SharedLayout>
                <div>Business Item Page: {business}</div>
            </SharedLayout>
        </Providers>
    );
}
