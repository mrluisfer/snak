import { Button } from '@/components/ui/button';
import { TypographyH3 } from '@/components/ui/typography-h3';
import { Providers } from '@/layout/providers';
import { SharedLayout } from '@/layout/shared-layout';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function BusinessPage() {
    return (
        <Providers>
            <SharedLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TypographyH3 className="font-serif">
                            All your business insights in one place
                        </TypographyH3>
                        <Button size={'lg'} asChild>
                            <Link href={'/business/new'}>
                                <p>Create a new Business</p>
                                <ChevronRightIcon />
                            </Link>
                        </Button>
                    </div>
                </div>
            </SharedLayout>
        </Providers>
    );
}
