import { Toaster } from 'sonner';
import { ApiStatusBadge } from '../components/api-status-badge';
import { Foods } from '../components/foods';
import { Navbar } from '../components/navbar';
import { CartProvider } from '../components/providers/cart-provider';
import { ThemeProvider } from '../components/providers/theme-provider';

export default function Home() {
    return (
        <ThemeProvider>
            <CartProvider>
                <main className="font-poppins container mx-auto py-6">
                    <Navbar />
                    <Foods />
                    <footer>
                        <ApiStatusBadge />
                    </footer>
                </main>
                <Toaster closeButton />
            </CartProvider>
        </ThemeProvider>
    );
}
