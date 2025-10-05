import { LoginModal } from './auth/login-modal';
import { SignupModal } from './auth/signup-modal';
import { CartDrawer } from './cart/cart-drawer';
import { SearchBar } from './search-bar';
import { AppLogo } from './shared/app-logo';
import { ThemeToggle } from './shared/theme-toggle';

export const Navbar = () => {
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="flex items-center gap-2 text-2xl font-semibold">
                    <AppLogo className="size-11" />
                    Snak
                </h1>
            </div>
            <div className="flex-1 px-6">
                <SearchBar className="w-full" />
            </div>
            <div>
                <nav className="flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li>
                            <CartDrawer />
                        </li>
                        <li>
                            <LoginModal />
                        </li>
                        <li>
                            <SignupModal />
                        </li>
                        <li>
                            <ThemeToggle />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
