'use client';

import { LoadingSpinner } from '@/components/shared/loadingSpinner';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { BugIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

export function CreateBusinessButton() {
    const { data, error, isPending } = authClient.useSession();

    if (isPending) return <LoadingSpinner />;

    if (error) {
        return (
            <div>
                <BugIcon className={'size-4 text-red-500'} />
                <p>Error loading Create Button</p>
            </div>
        );
    }

    if (!data?.user) return null;

    return (
        <Button size={'lg'} asChild>
            <Link href={'/business/new'}>
                <p>Create a new Business</p>
                <ChevronRightIcon />
            </Link>
        </Button>
    );
}
