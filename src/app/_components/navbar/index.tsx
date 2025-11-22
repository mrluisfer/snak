import { CartDrawer } from '../../../components/cart/cart-drawer';
import { ThemeToggle } from '../../../components/shared/theme-toggle';
import { Addresses } from './addresses';
import RegisterBtn from './register-btn';
import { SearchBar } from './search-bar';

export const Navbar = () => {
    return (
        <header className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
                <Addresses />
                <SearchBar className="w-full" />
                <RegisterBtn />
            </div>
            <div>
                <nav className="flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li>
                            <CartDrawer />
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
