import type { ApiUser } from '@/types/api/api-types';
import Link from 'next/link';
import { ApiStatusBadge } from '../api-status-badge';
import { CartDrawer } from '../cart/cart-drawer';
import { SearchBar } from '../search-bar';
import { AppLogo } from '../shared/app-logo';
import { ThemeToggle } from '../shared/theme-toggle';
import { Button } from '../ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';
import { Addresses } from './addresses';
import { AppTitle } from './app-title';
import { UserProfileModal } from './user-profile-modal';

export const Navbar = () => {

    return (
        <header className="flex items-center justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <AppLogo className="size-11" />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <AppTitle />
                            </TooltipTrigger>
                            <TooltipContent className="flex flex-col gap-1">
                                Your favorite food, delivered fast is working
                                well!
                                <ApiStatusBadge />
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="flex flex-1 items-center gap-2 px-6">
                <Addresses />
                <SearchBar className="w-full" />
            </div>
            <div>
                <nav className="flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li>
                            <CartDrawer />
                        </li>
                        {false ? (
                            <li>
                                <UserProfileModal user={{} as ApiUser} />
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Button variant="ghost" asChild>
                                        <Link href={'/login'}>Login</Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button variant="outline" asChild>
                                        <Link href={'/register'}>Sign up</Link>
                                    </Button>
                                </li>
                            </>
                        )}

                        <li>
                            <ThemeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
