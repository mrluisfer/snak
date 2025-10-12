import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/components/providers/cart-provider';
import { SharedLayout } from '@/layout/shared-layout';

export default function Home() {
    return (
        <CartProvider>
            <SharedLayout>
                <div className="min-h-screen">
                    <Navbar />
                    {/* <Foods /> */}
                </div>
            </SharedLayout>
        </CartProvider>
    );
}
