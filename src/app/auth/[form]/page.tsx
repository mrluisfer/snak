'use client';

import { AppTitle } from '@/components/navbar/app-title';
import { AppLogo } from '@/components/shared/app-logo';
import { Button } from '@/components/ui/button';
import { Providers } from '@/layout/providers';
import { HouseIcon } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { LoginForm } from './_components/login/login-form';
import { SignUpForm } from './_components/sign-up/sign-up-form';
import { getAuthModeFromKey } from './_lib/utils';

enum ValidAuthModes {
    LOGIN = 'login',
    SIGNUP = 'signup',
}
export default function AuthPage({
    params,
}: {
    params: Promise<{ form: string }>;
}) {
    const { form } = use(params);
    const authMode = getAuthModeFromKey(form);

    return (
        <Providers>
            <div className="container mx-auto">
                <header className="flex items-center justify-between pt-6">
                    <Link
                        href={'/'}
                        className="flex items-center justify-start gap-1"
                    >
                        <AppLogo className="size-10" />
                        <AppTitle />
                    </Link>
                    <Button variant="link" asChild>
                        <Link href="/">
                            <HouseIcon />
                            Go back home
                        </Link>
                    </Button>
                </header>
                <div className="flex h-screen flex-col items-center justify-start pt-12">
                    <div className="mx-auto flex items-center justify-center">
                        {authMode === ValidAuthModes.LOGIN ? (
                            <LoginForm />
                        ) : null}
                        {authMode === ValidAuthModes.SIGNUP ? (
                            <SignUpForm />
                        ) : null}
                    </div>
                </div>
            </div>
        </Providers>
    );
}
