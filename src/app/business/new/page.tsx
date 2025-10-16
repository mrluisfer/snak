'use client';

import { TypographyH1 } from '@/components/ui/typography-h1';
import { Providers } from '@/layout/providers';
import { SharedLayout } from '@/layout/shared-layout';
import { RocketIcon } from 'lucide-react';
import { NewBusinessForm } from '@/app/business/new/_components/new-business-form';
import { CreateBusinessMembersForm } from '@/app/business/new/_components/create-business-members-form';

export default function BusinessNewPage() {
    return (
        <Providers>
            <SharedLayout>
                <TypographyH1 className="flex items-baseline justify-start gap-2 font-serif">
                    <RocketIcon />
                    Create your next big business idea
                </TypographyH1>
                <div className={'items-start justify-around gap-6 mt-8 grid grid-cols-2'}>
                    <NewBusinessForm />
                    <CreateBusinessMembersForm />
                </div>
            </SharedLayout>
        </Providers>
    );
}
