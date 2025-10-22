'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { BugIcon, PencilLineIcon } from 'lucide-react';
import Link from 'next/link';

export default function RegisterBtn() {
    const { data, error, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex items-center gap-2">
                <Spinner />
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <BugIcon />
                Error loading the button
            </div>
        );
    }

    if (!data) {
        return (
            <div>
                <Button variant="secondary" asChild>
                    <Link href="/auth/register">
                        <PencilLineIcon />
                        Register
                    </Link>
                </Button>
            </div>
        );
    }

    return null;
}
