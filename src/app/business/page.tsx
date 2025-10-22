import { CreateBusinessButton } from '@/app/business/_components/CreateBusinessButton';
import { TypographyH3 } from '@/components/ui/typography-h3';
import { Providers } from '@/layout/providers';
import { SharedLayout } from '@/layout/shared-layout';

export default function BusinessPage() {
    return (
        <Providers>
            <SharedLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TypographyH3 className="font-serif">
                            All your business insights in one place
                        </TypographyH3>
                        <CreateBusinessButton />
                    </div>
                </div>
            </SharedLayout>
        </Providers>
    );
}
