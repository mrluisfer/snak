import { CartDrawer } from '../cart/cart-drawer';
import { ThemeToggle } from '../shared/theme-toggle';
import { Addresses } from './addresses';

export const Navbar = () => {
    return (
        <header className="flex items-center justify-between">
            <div></div>
            <div className="flex flex-1 items-center gap-2 px-6">
                <Addresses />
                {/* <SearchBar className="w-full" /> */}
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
