import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';

const authLinks = {
    login: {
        href: '/register',
        text: "Don't have an account? Sign up",
    },
    register: {
        href: '/login',
        text: 'Already have an account? Log in',
    },
};

export const AuthNavbar = ({ mode }: { mode: 'login' | 'register' }) => {
    return (
        <header className="flex items-center justify-between">
            <Button asChild size={'sm'} variant={'ghost'}>
                <Link href={'/'}>
                    <ChevronLeft />
                    Back to home
                </Link>
            </Button>

            <Button size="sm" variant="ghost" asChild>
                <Link href={authLinks[mode].href}>{authLinks[mode].text}</Link>
            </Button>
        </header>
    );
};
