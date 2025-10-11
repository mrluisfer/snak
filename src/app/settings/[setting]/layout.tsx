'use client';
import { Button } from '@/components/ui/button';
import { Providers } from '@/layout/providers';
import { SharedLayout } from '@/layout/shared-layout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const settingsFields = [
    { name: 'Account', href: '/settings/account' },
    { name: 'Billing', href: '/settings/billing' },
    { name: 'Privacy', href: '/settings/privacy' },
];

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    console.log({ pathname });
    return (
        <Providers>
            <SharedLayout>
                <div className="pt-24">
                    <div>
                        <h1 className="font-serif text-2xl font-bold">
                            Settings
                        </h1>
                    </div>
                    <div className="my-4 grid w-full max-w-6xl gap-x-8 md:my-8 md:grid-cols-[220px_minmax(0px,_1fr)]">
                        <nav className="flex flex-col gap-2 font-medium">
                            {settingsFields.map((field) => (
                                <Button
                                    variant="ghost"
                                    className="justify-start text-lg"
                                    key={field.name}
                                    asChild
                                    size={'lg'}
                                >
                                    <Link href={field.href}>{field.name}</Link>
                                </Button>
                            ))}
                        </nav>
                        <div>{children}</div>
                    </div>
                </div>
            </SharedLayout>
        </Providers>
    );
}
